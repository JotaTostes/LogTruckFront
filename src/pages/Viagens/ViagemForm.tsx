import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import FilterableDropdown from "../../components/ui/FiltrableDropdown";
import { useViagemStore } from "../../store/viagemStore";
import {
  Truck,
  MapPin,
  Calendar,
  DollarSign,
  Route,
  AlertCircle,
  User,
  Percent,
} from "lucide-react";
import type { Motorista } from "../../types/Motorista";
import type { Caminhao } from "../../types/Caminhao";
import type { Viagem } from "../../types/Viagem";
import { formatarPlaca } from "../../utils/formatadores";

type ViagemFormProps = {
  motoristas: Motorista[];
  caminhoes: Caminhao[];
  onSuccess: () => void;
  viagem?: Viagem | null;
};

export default function ViagemForm({
  motoristas,
  caminhoes,
  onSuccess,
  viagem,
}: ViagemFormProps) {
  const { adicionarViagem, editarViagem } = useViagemStore();

  const [motoristaId, setMotoristaId] = useState(viagem?.motoristaId ?? "");
  const [caminhaoId, setCaminhaoId] = useState(viagem?.caminhaoId ?? "");
  const [origem, setOrigem] = useState(viagem?.origem ?? "");
  const [destino, setDestino] = useState(viagem?.destino ?? "");
  const [quilometragem, setQuilometragem] = useState(
    viagem?.quilometragem ?? 0
  );
  const [comissao, setComissao] = useState(viagem?.comissao ?? 0);
  const [valorFrete, setValorFrete] = useState(viagem?.valorFrete ?? 0);
  const [dataSaida, setDataSaida] = useState(
    viagem?.dataSaida ? viagem.dataSaida.slice(0, 10) : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!viagem;

  // Opções para dropdowns
  const motoristasOptions = motoristas
    .map((m) => ({
      id: m.id ?? "",
      label: `${m.nome}`,
    }))
    .filter((option) => option.id !== "");

  const caminhoesOptions = caminhoes.map((c) => ({
    id: c.id,
    label: `${formatarPlaca(c.placa)} - ${c.modelo}`,
  }));

  const selectedMotorista =
    motoristasOptions.find((option) => option.id === motoristaId) || null;
  const selectedCaminhao =
    caminhoesOptions.find((option) => option.id === caminhaoId) || null;

  const handleMotoristaChange = (
    option: { id: string; label: string } | null
  ) => {
    setMotoristaId(option ? option.id : "");
    if (errors.motoristaId) {
      setErrors((prev) => {
        const { motoristaId, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleCaminhaoChange = (
    option: { id: string; label: string } | null
  ) => {
    setCaminhaoId(option ? option.id : "");
    if (errors.caminhaoId) {
      setErrors((prev) => {
        const { caminhaoId, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!motoristaId) newErrors.motoristaId = "Selecione o motorista";
    if (!caminhaoId) newErrors.caminhaoId = "Selecione o caminhão";
    if (!origem.trim()) newErrors.origem = "Origem é obrigatória";
    if (!destino.trim()) newErrors.destino = "Destino é obrigatório";
    if (quilometragem <= 0)
      newErrors.quilometragem = "Quilometragem deve ser maior que zero";
    if (valorFrete <= 0)
      newErrors.valorFrete = "Valor do frete deve ser maior que zero";
    if (!dataSaida) newErrors.dataSaida = "Data de saída é obrigatória";
    if (comissao < 0 || comissao > 100) {
      newErrors.comissao = "Comissão deve estar entre 0 e 100%";
    }
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
      const viagemData = {
        motoristaId,
        caminhaoId,
        origem: origem.trim(),
        destino: destino.trim(),
        quilometragem,
        valorFrete,
        dataSaida,
        comissao,
      };

      if (isEdit && viagem?.id) {
        await editarViagem(viagem.id, { ...viagemData, id: viagem.id });
        toast.success("Viagem atualizada com sucesso!");
      } else {
        await adicionarViagem(viagemData);
        toast.success("Viagem cadastrada com sucesso!");
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(
        isEdit ? "Erro ao atualizar viagem." : "Erro ao cadastrar viagem."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Motorista Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User className="h-4 w-4" />
            Motorista
          </label>
          <FilterableDropdown
            options={motoristasOptions}
            placeholder="Selecione um motorista..."
            value={selectedMotorista}
            onChange={handleMotoristaChange}
            className={`w-full ${errors.motoristaId ? "border-red-300" : ""}`}
          />
          {errors.motoristaId && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.motoristaId}
            </div>
          )}
        </div>

        {/* Caminhão Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Caminhão
          </label>
          <FilterableDropdown
            options={caminhoesOptions}
            placeholder="Selecione um caminhão..."
            value={selectedCaminhao}
            onChange={handleCaminhaoChange}
            className={`w-full ${errors.caminhaoId ? "border-red-300" : ""}`}
          />
          {errors.caminhaoId && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.caminhaoId}
            </div>
          )}
        </div>

        {/* Origem */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Origem
          </label>
          <Input
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            placeholder="Digite a origem"
            className={errors.origem ? "border-red-300" : ""}
          />
          {errors.origem && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.origem}
            </div>
          )}
        </div>

        {/* Destino */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Destino
          </label>
          <Input
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            placeholder="Digite o destino"
            className={errors.destino ? "border-red-300" : ""}
          />
          {errors.destino && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.destino}
            </div>
          )}
        </div>

        {/* Quilometragem */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Route className="h-4 w-4" />
            Quilometragem
          </label>
          <Input
            type="number"
            value={quilometragem}
            onChange={(e) => setQuilometragem(Number(e.target.value))}
            placeholder="0"
            className={errors.quilometragem ? "border-red-300" : ""}
          />
          {errors.quilometragem && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.quilometragem}
            </div>
          )}
        </div>

        {/* Valor Frete */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Valor do Frete
          </label>
          <Input
            type="number"
            value={valorFrete}
            onChange={(e) => setValorFrete(Number(e.target.value))}
            placeholder="0.00"
            step="0.01"
            className={errors.valorFrete ? "border-red-300" : ""}
          />
          {errors.valorFrete && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.valorFrete}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Comissão do Motorista
          </label>
          <div className="relative">
            <Input
              type="number"
              value={comissao}
              onChange={(e) => setComissao(Number(e.target.value))}
              placeholder="0"
              min="0"
              max="100"
              step="0.1"
              className={errors.comissao ? "border-red-300" : ""}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              %
            </span>
          </div>
          {errors.comissao && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.comissao}
            </div>
          )}
        </div>
        {/* Data Saída */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Data de Saída
          </label>
          <Input
            type="date"
            value={dataSaida}
            onChange={(e) => setDataSaida(e.target.value)}
            className={errors.dataSaida ? "border-red-300" : ""}
          />
          {errors.dataSaida && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="h-3 w-3" />
              {errors.dataSaida}
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
                {isEdit ? "Salvando..." : "Cadastrando..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isEdit ? (
                  <Truck className="h-5 w-5" />
                ) : (
                  <Truck className="h-5 w-5" />
                )}
                {isEdit ? "Salvar Alterações" : "Cadastrar Viagem"}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
