import { useState, useEffect } from "react";
import { Option } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useUsuarioStore } from "../../store/usuarioStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { MTSwitch as Switch } from "../../components/ui/mt/MTSwitch";
import { MTSelect as Select } from "../../components/ui/mt/MTSelect";
import type { Usuario } from "../../types/Usuario";

export type UsuarioFormProps = {
  usuario?: Usuario | null;
  onSuccess: () => void;
};

export default function UsuarioForm({ usuario, onSuccess }: UsuarioFormProps) {
  const { adicionarUsuario } = useUsuarioStore();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState<"Administrador" | "Operador" | "Motorista">(
    "Operador"
  );
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setCpf(usuario.cpf);
      setRole(usuario.role);
      setAtivo(usuario.ativo);
      setSenha("");
    }
  }, [usuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await adicionarUsuario({
        nome,
        email,
        cpf,
        role,
        ativo,
        senhaHash: senha,
      });

      toast.success("Usuário cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setCpf("");
      setSenha("");
      setRole("Operador");
      setAtivo(true);

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />

      <Input
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Tipo de Usuário
        </label>
        <Select
          className="w-72"
          label="Selecionar"
          value={role}
          onChange={(value) =>
            setRole(value as "Administrador" | "Operador" | "Motorista")
          }
        >
          <Option value="Administrador">Administrador</Option>
          <Option value="Operador">Operador</Option>
          <Option value="Motorista">Motorista</Option>
        </Select>
      </div>

      {/* <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-700">Usuário Ativo</span>
        <Switch checked={ativo} onChange={() => setAtivo(!ativo)} />
      </div> */}

      <Button type="submit" isLoading={loading} disabled={loading}>
        {usuario ? "Salvar Alterações" : "Cadastrar"}
      </Button>
    </form>
  );
}
