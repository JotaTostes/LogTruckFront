import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { MTSwitch as Switch } from "../../components/ui/mt/MTSwitch";
import {
  User,
  Mail,
  CreditCard,
  Lock,
  Shield,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Eye,
  EyeOff,
  Truck,
} from "lucide-react";
import type {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  Usuario,
} from "../../types/Usuario";
import { usuarioController } from "../../controllers/usuarioController";

export type UsuarioFormProps = {
  usuario?: Usuario | null;
  onSuccess: () => void;
};

const roleMap = { Administrador: 1, Motorista: 2, Operador: 3 };

export default function UsuarioForm({ usuario, onSuccess }: UsuarioFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<"Administrador" | "Operador" | "Motorista">(
    "Operador"
  );
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!usuario;

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setCpf(usuario.cpf);
      setRole(
        usuario.role.toString() as "Administrador" | "Operador" | "Motorista"
      );
      setAtivo(usuario.ativo);
    }
  }, [usuario]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (!cpf.trim()) newErrors.cpf = "CPF é obrigatório";
    else if (cpf.replace(/\D/g, "").length !== 11)
      newErrors.cpf = "CPF deve ter 11 dígitos";
    if (!isEdit && !senha.trim()) newErrors.senha = "Senha é obrigatória";
    else if (senha && senha.length < 6)
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setNome("");
    setEmail("");
    setCpf("");
    setSenha("");
    setRole("Operador");
    setAtivo(true);
    setErrors({});
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned
      .substring(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2");
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    if (errors.cpf) {
      setErrors({ ...errors, cpf: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os campos destacados");
      return;
    }
    setLoading(true);
    try {
      const usuarioData: CreateUsuarioDto | UpdateUsuarioDto =
        isEdit && usuario?.id
          ? {
              id: usuario.id,
              nome: nome.trim(),
              email: email.trim().toLowerCase(),
              senha: senha.trim() || "",
              cpf: cpf.replace(/\D/g, ""),
              role: roleMap[role],
            }
          : {
              nome: nome.trim(),
              email: email.trim().toLowerCase(),
              senha: senha.trim() || "",
              cpf: cpf.replace(/\D/g, ""),
              role: roleMap[role],
            };

      if (isEdit && usuario?.id) {
        await usuarioController.editUsuario(
          usuario.id,
          usuarioData as UpdateUsuarioDto
        );
      } else {
        await usuarioController.addUsuario(usuarioData as CreateUsuarioDto);
        resetForm();
      }
      onSuccess();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (roleValue: string) => {
    switch (roleValue) {
      case "Administrador":
        return "from-red-500 to-pink-500";
      case "Operador":
        return "from-blue-500 to-indigo-500";
      case "Motorista":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getRoleIcon = (roleValue: string) => {
    switch (roleValue) {
      case "Administrador":
        return <Shield className="h-4 w-4" />;
      case "Operador":
        return <User className="h-4 w-4" />;
      case "Motorista":
        return <Truck className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-blue-500" />
        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ${
              loading ? "w-full animate-pulse" : "w-0"
            }`}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <User className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-slate-700">
              Informações Pessoais
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
          </div>

          {/* Nome Field */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                icon={<User className="h-4 w-4 text-slate-400" />}
                label="Nome Completo"
                value={nome}
                onChange={(e: any) => {
                  setNome(e.target.value);
                  if (errors.nome) setErrors({ ...errors, nome: "" });
                }}
                required
                className={`pl-10 ${
                  errors.nome ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="Digite o nome completo"
              />
            </div>
            {errors.nome && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.nome}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                icon={<Mail className="h-4 w-4 text-slate-400" />}
                label="Email"
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                required
                className={`pl-10 ${
                  errors.email ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="usuario@exemplo.com"
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </div>
            )}
          </div>

          {/* CPF Field */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                icon={<CreditCard className="h-4 w-4 text-slate-400" />}
                label="CPF"
                value={cpf}
                onChange={handleCPFChange}
                required
                className={`pl-10 ${
                  errors.cpf ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="000.000.000-00"
                maxLength={14}
              />
            </div>
            {errors.cpf && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.cpf}
              </div>
            )}
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-slate-700">Segurança e Acesso</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent" />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                icon={<Lock className="h-4 w-4 text-slate-400" />}
                label={
                  isEdit ? "Nova Senha (deixe vazio para manter)" : "Senha"
                }
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e: any) => {
                  setSenha(e.target.value);
                  if (errors.senha) setErrors({ ...errors, senha: "" });
                }}
                required={!isEdit}
                className={`pl-10 pr-12 ${
                  errors.senha ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder={
                  isEdit ? "Digite uma nova senha" : "Digite a senha"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 z-20 text-gray-500 hover:text-gray-700 transition-colors p-1 flex items-center justify-center"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  marginTop: "12px",
                }}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.senha && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.senha}
              </div>
            )}
            {senha && senha.length < 6 && (
              <div className="text-amber-600 text-sm flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Senha muito fraca. Use pelo menos 6 caracteres.
              </div>
            )}
          </div>
          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Tipo de Usuário
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["Administrador", "Operador", "Motorista"] as const).map(
                (roleOption) => (
                  <button
                    key={roleOption}
                    type="button"
                    onClick={() => setRole(roleOption)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      role === roleOption
                        ? `border-transparent bg-gradient-to-r ${getRoleColor(
                            roleOption
                          )} text-white shadow-lg`
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${
                          role === roleOption ? "bg-white/20" : "bg-slate-100"
                        }`}
                      >
                        {getRoleIcon(roleOption)}
                      </div>
                      <span className="font-medium text-sm">{roleOption}</span>
                    </div>
                    {role === roleOption && (
                      <div className="absolute -top-1 -right-1">
                        <CheckCircle2 className="h-5 w-5 text-white bg-green-500 rounded-full" />
                      </div>
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Status Toggle */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    ativo ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      ativo ? "text-green-600" : "text-red-600"
                    }`}
                  />
                </div>
                <div>
                  <span className="font-medium text-slate-700">
                    Status do Usuário
                  </span>
                  <p className="text-sm text-slate-500">
                    {ativo
                      ? "Usuário pode acessar o sistema"
                      : "Acesso bloqueado ao sistema"}
                  </p>
                </div>
              </div>
              <Switch
                checked={ativo}
                onChange={() => setAtivo(!ativo)}
                className="ml-4"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 font-semibold text-lg rounded-xl transition-all duration-300"
            showArrow={false}
            icon={
              isEdit ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )
            }
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEdit ? "Salvando..." : "Cadastrando..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isEdit ? "Salvar Alterações" : "Cadastrar Usuário"}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
