import { useState, useEffect } from "react";
import { Select, Option, Switch } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useUsuarioStore } from "../../store/usuarioStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
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
      setSenha(""); // normalmente não trazemos a senha de volta
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

      // limpa o formulário
      setNome("");
      setEmail("");
      setCpf("");
      setSenha("");
      setRole("Operador");
      setAtivo(true);

      // fecha modal se callback for passado
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded shadow max-w-xl"
    >
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

      <Select
        label="Tipo de usuário"
        value={role}
        onChange={(value) =>
          setRole(value as "Administrador" | "Operador" | "Motorista")
        }
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <Option value="Administrador">Administrador</Option>
        <Option value="Operador">Operador</Option>
        <Option value="Motorista">Motorista</Option>
      </Select>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-700">Usuário Ativo</span>
        <Switch
          checked={ativo}
          onChange={() => setAtivo(!ativo)}
          crossOrigin=""
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />
      </div>

      <Button type="submit" isLoading={loading} disabled={loading}>
        Cadastrar
      </Button>
    </form>
  );
}
