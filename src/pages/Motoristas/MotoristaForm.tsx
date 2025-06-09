import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import FilterableDropdown from "../../components/ui/FiltrableDropdown";
import { useMotoristaStore } from "../../store/motoristaStore";
import { MTSwitch as Switch } from "../../components/ui/mt/MTSwitch";
import {
  User,
  CreditCard,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  IdCard,
} from "lucide-react";
import type { Usuario, UsuarioDto } from "../../types/Usuario";
import type { Motorista } from "../../types/Motorista";

type MotoristaFormProps = {
  usuariosMotoristas: UsuarioDto[];
  onSuccess: () => void;
  motorista?: Motorista | null;
};

export default function MotoristaForm({
  usuariosMotoristas,
  onSuccess,
  motorista,
}: MotoristaFormProps) {
  const { adicionarMotorista, editarMotorista } = useMotoristaStore();
  const [usuarioId, setUsuarioId] = useState(motorista?.id ?? "");
  const [cnh, setCnh] = useState(motorista?.cnh ?? "");
  const [nome, setNome] = useState(motorista?.nome ?? "");
  const [dataNascimento, setDataNascimento] = useState(
    motorista?.dataNascimento ? motorista.dataNascimento.slice(0, 10) : ""
  );
  const [telefone, setTelefone] = useState(motorista?.telefone ?? "");
  const [ativo, setAtivo] = useState(motorista?.ativo ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const isEdit = !!motorista;

  // Filtro para dropdown
  const usuariosMotoristaOptions = usuariosMotoristas
    .filter((um) => um.motorista === null)
    .map((um) => ({
      id: um.id,
      label: `${um.nome} (${um.email})`,
    }));
  const selectedUsuario =
    usuariosMotoristaOptions.find((option) => option.id === usuarioId) || null;

  const handleUsuarioMotoristaChange = (
    option: { id: string; label: string } | null
  ) => {
    setUsuarioId(option ? option.id : "");
    if (errors.usuarioId) {
      setErrors((prev) => {
        const { usuarioId, ...rest } = prev;
        return rest;
      });
    }
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!usuarioId) newErrors.usuarioId = "Selecione o usuário";
    if (!cnh.trim()) newErrors.cnh = "CNH é obrigatória";
    if (!dataNascimento)
      newErrors.dataNascimento = "Data de nascimento é obrigatória";
    if (!telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, corrija os campos destacados");
      return;
    }

    setLoading(true);
    try {
      if (isEdit && motorista?.id) {
        await editarMotorista(motorista.id, {
          id: motorista.id,
          nome: nome.trim(),
          dataNascimento,
          cnh: cnh.trim(),
          telefone: telefone.trim(),
        });
        toast.success("Motorista atualizado com sucesso!");
      } else {
        await adicionarMotorista({
          usuarioId,
          cnh: cnh.trim(),
          dataNascimento,
          telefone: telefone.trim(),
          nome: "",
          cpf: "",
          ativo: true,
        });
        toast.success("Motorista cadastrado com sucesso!");
      }

      if (!isEdit) {
        setNome("");
        setAtivo(true);
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(
        isEdit ? "Erro ao atualizar motorista." : "Erro ao cadastrar motorista."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Usuário Dropdown ou Nome */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User className="h-4 w-4" />
            Usuário Motorista
          </label>
          {isEdit ? (
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do motorista"
              className={errors.nome ? "border-red-300" : ""}
            />
          ) : (
            <FilterableDropdown
              options={usuariosMotoristaOptions}
              placeholder="Selecione um usuário..."
              value={selectedUsuario}
              onChange={handleUsuarioMotoristaChange}
              className={`w-full ${errors.usuarioId ? "border-red-300" : ""}`}
            />
          )}
          {!isEdit && errors.usuarioId && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.usuarioId}
            </div>
          )}
          {isEdit && errors.nome && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.nome}
            </div>
          )}
        </div>

        {/* CNH */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            CNH
          </label>
          <Input
            icon={<IdCard className="h-4 w-4" />}
            value={cnh}
            onChange={(e) => setCnh(e.target.value)}
            placeholder="Digite o número da CNH"
            error={!!errors.cnh}
          />
          {errors.cnh && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.cnh}
            </div>
          )}
        </div>

        {/* Data de Nascimento */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            Data de Nascimento
          </label>
          <Input
            icon={<Calendar className="h-4 w-4" />}
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            error={!!errors.dataNascimento}
          />
          {errors.dataNascimento && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.dataNascimento}
            </div>
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            Telefone
          </label>
          <Input
            icon={<Phone className="h-4 w-4" />}
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="(99) 99999-9999"
            error={!!errors.telefone}
          />
          {errors.telefone && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.telefone}
            </div>
          )}
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
                  Status do Motorista
                </span>
                <p className="text-sm text-slate-500">
                  {ativo ? "Motorista ativo" : "Motorista inativo"}
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

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 font-semibold text-lg rounded-xl transition-all duration-300"
            showArrow={false}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEdit ? "Salvando..." : "Cadastrando..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isEdit ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
                {isEdit ? "Salvar Alterações" : "Cadastrar Motorista"}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
