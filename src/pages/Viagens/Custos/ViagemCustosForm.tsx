import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import FilterableDropdown from "../../../components/ui/FiltrableDropdown";
import { useCustoViagemStore } from "../../../store/custoViagemStore";
import {
  Receipt,
  Calendar,
  DollarSign,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

const tiposCustoOptions = [
  { id: "1", label: "Combustível" },
  { id: "2", label: "Pernoite" },
  { id: "3", label: "Pedágio" },
  { id: "4", label: "Manutenção" },
  { id: "99", label: "Outros" },
];

type Props = {
  viagemId: string;
  onSuccess: () => void;
};

export default function ViagemCustosForm({ viagemId, onSuccess }: Props) {
  const { adicionarCustoViagem } = useCustoViagemStore();

  const [tipo, setTipo] = useState<string>("1");
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [dataRegistro, setDataRegistro] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const selectedTipo =
    tiposCustoOptions.find((option) => option.id === tipo.toString()) || null;

  const handleTipoChange = (option: { id: string; label: string } | null) => {
    setTipo(option ? option.id : "1");
    if (errors.tipo) {
      setErrors((prev) => {
        const { tipo, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!tipo) newErrors.tipo = "Selecione o tipo de custo";
    if (valor <= 0) newErrors.valor = "Valor deve ser maior que zero";
    if (!descricao.trim()) newErrors.descricao = "Descrição é obrigatória";
    if (!dataRegistro) newErrors.dataRegistro = "Data é obrigatória";

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
      await adicionarCustoViagem({
        viagemId,
        tipo: Number(tipo),
        valor,
        descricao: descricao.trim(),
      });

      toast.success("Custo registrado com sucesso!");

      // Reset form
      setTipo("1");
      setValor(0);
      setDescricao("");
      setDataRegistro(new Date().toISOString().slice(0, 10));

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao registrar custo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Custo Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Tipo de Custo
          </label>
          <FilterableDropdown
            options={tiposCustoOptions}
            placeholder="Selecione o tipo..."
            value={selectedTipo}
            onChange={handleTipoChange}
            className={`w-full ${errors.tipo ? "border-red-300" : ""}`}
          />
          {errors.tipo && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.tipo}
            </div>
          )}
        </div>

        {/* Valor */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Valor
          </label>
          <Input
            type="number"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            placeholder="0.00"
            step="0.01"
            className={errors.valor ? "border-red-300" : ""}
          />
          {errors.valor && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.valor}
            </div>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Descrição
          </label>
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição"
            className={errors.descricao ? "border-red-300" : ""}
          />
          {errors.descricao && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.descricao}
            </div>
          )}
        </div>

        {/* Data Registro */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Data do Registro
          </label>
          <Input
            type="date"
            value={dataRegistro}
            onChange={(e) => setDataRegistro(e.target.value)}
            className={errors.dataRegistro ? "border-red-300" : ""}
          />
          {errors.dataRegistro && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.dataRegistro}
            </div>
          )}
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
                Registrando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Registrar Custo
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
