import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useCaminhaoStore } from "../../store/caminhaoStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { MTSwitch as Switch } from "../../components/ui/mt/MTSwitch";
import {
  Truck,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Calendar,
  Weight,
  Tag,
  Building,
} from "lucide-react";
import type { Caminhao } from "../../types/Caminhao";

type CaminhaoFormProps = {
  caminhao?: Caminhao | null;
  onSuccess: () => void;
};

export default function CaminhaoForm({
  caminhao,
  onSuccess,
}: CaminhaoFormProps) {
  const { adicionarCaminhao, editarCaminhao } = useCaminhaoStore();
  const [placa, setPlaca] = useState(caminhao?.placa ?? "");
  const [modelo, setModelo] = useState(caminhao?.modelo ?? "");
  const [marca, setMarca] = useState(caminhao?.marca ?? "");
  const [ano, setAno] = useState(caminhao?.ano ?? new Date().getFullYear());
  const [capacidadeToneladas, setCapacidadeToneladas] = useState(
    caminhao?.capacidadeToneladas ?? 0
  );
  const [ativo, setAtivo] = useState(caminhao?.ativo ?? true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEdit = !!caminhao;

  useEffect(() => {
    if (caminhao) {
      setPlaca(caminhao.placa);
      setModelo(caminhao.modelo);
      setMarca(caminhao.marca);
      setAno(caminhao.ano);
      setCapacidadeToneladas(caminhao.capacidadeToneladas);
      setAtivo(caminhao.ativo);
    }
  }, [caminhao]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!placa.trim()) newErrors.placa = "Placa é obrigatória";
    if (!modelo.trim()) newErrors.modelo = "Modelo é obrigatório";
    if (!marca.trim()) newErrors.marca = "Marca é obrigatória";
    if (!ano) newErrors.ano = "Ano é obrigatório";
    if (ano < 1900 || ano > new Date().getFullYear() + 1)
      newErrors.ano = "Ano inválido";
    if (!capacidadeToneladas || capacidadeToneladas <= 0)
      newErrors.capacidadeToneladas = "Capacidade deve ser maior que zero";

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
      const caminhaoData = {
        placa: placa.trim().toUpperCase(),
        modelo: modelo.trim(),
        marca: marca.trim(),
        ano,
        capacidadeToneladas,
      };

      if (isEdit && caminhao?.id) {
        await editarCaminhao(caminhao.id, {
          ...caminhaoData,
          id: caminhao.id,
        });
        toast.success("Caminhão atualizado com sucesso!");
      } else {
        await adicionarCaminhao(caminhaoData);
        toast.success("Caminhão cadastrado com sucesso!");
      }

      if (!isEdit) {
        setPlaca("");
        setModelo("");
        setMarca("");
        setAno(new Date().getFullYear());
        setCapacidadeToneladas(0);
        setAtivo(true);
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error(
        isEdit ? "Erro ao atualizar caminhão." : "Erro ao cadastrar caminhão."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <Truck className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-slate-700">
              Informações do Caminhão
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
          </div>

          {/* Placa Field */}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Tag className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                label="Placa"
                value={placa}
                onChange={(e) => {
                  setPlaca(e.target.value.toUpperCase());
                  if (errors.placa) setErrors({ ...errors, placa: "" });
                }}
                className={`pl-10 uppercase ${
                  errors.placa ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="ABC1234"
                maxLength={7}
              />
            </div>
            {errors.placa && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.placa}
              </div>
            )}
          </div>

          {/* Modelo Field */}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Truck className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                label="Modelo"
                value={modelo}
                onChange={(e) => {
                  setModelo(e.target.value);
                  if (errors.modelo) setErrors({ ...errors, modelo: "" });
                }}
                className={`pl-10 ${
                  errors.modelo ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="FH 460"
              />
            </div>
            {errors.modelo && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.modelo}
              </div>
            )}
          </div>

          {/* Marca Field */}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Building className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                label="Marca"
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                  if (errors.marca) setErrors({ ...errors, marca: "" });
                }}
                className={`pl-10 ${
                  errors.marca ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="Volvo"
              />
            </div>
            {errors.marca && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.marca}
              </div>
            )}
          </div>

          {/* Ano Field */}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                type="number"
                label="Ano"
                value={ano}
                onChange={(e) => {
                  setAno(Number(e.target.value));
                  if (errors.ano) setErrors({ ...errors, ano: "" });
                }}
                className={`pl-10 ${
                  errors.ano ? "border-red-300 focus:border-red-500" : ""
                }`}
                min={1900}
                max={new Date().getFullYear() + 1}
              />
            </div>
            {errors.ano && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.ano}
              </div>
            )}
          </div>

          {/* Capacidade Field */}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Weight className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                type="number"
                label="Capacidade (toneladas)"
                value={capacidadeToneladas}
                onChange={(e) => {
                  setCapacidadeToneladas(Number(e.target.value));
                  if (errors.capacidadeToneladas)
                    setErrors({ ...errors, capacidadeToneladas: "" });
                }}
                className={`pl-10 ${
                  errors.capacidadeToneladas
                    ? "border-red-300 focus:border-red-500"
                    : ""
                }`}
                step="0.1"
                min="0"
              />
            </div>
            {errors.capacidadeToneladas && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="h-3 w-3" />
                {errors.capacidadeToneladas}
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
                    Status do Caminhão
                  </span>
                  <p className="text-sm text-slate-500">
                    {ativo
                      ? "Caminhão disponível para viagens"
                      : "Caminhão indisponível"}
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
                  <Truck className="h-5 w-5" />
                )}
                {isEdit ? "Salvar Alterações" : "Cadastrar Caminhão"}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
