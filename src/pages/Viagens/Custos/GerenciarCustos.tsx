import React, { useState, useEffect } from "react";
import FormModal from "../../../components/ui/FormModal";
import FilterableDropdown from "../../../components/ui/FiltrableDropdown";
import { DataTable } from "../../../components/ui/DataTable";
import { Button } from "../../../components/ui/Button";
import { Edit3, Trash2, Plus } from "lucide-react";
import { viagemController } from "../../../controllers/viagemController";
import { useCustoViagemStore } from "../../../store/custoViagemStore";
import type { CustoViagemPayload } from "../../../types/CustoViagem";
import type { ViagemCompletas } from "../../../types/Viagem";
import { useViagemStore } from "../../../store/viagemStore";
import {
  CustoViagemActions,
  custoViagemColumns,
} from "../../../layouts/Table/CustosViagemTableConfig";
import CustoFormModal from "./CustoFormModal";

const GerenciarCustos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCost, setSelectedCost] = useState<CustoViagemPayload | null>(
    null
  );
  const viagensCompletas = useViagemStore((state) => state.viagensCompletas);
  const [costs, setCosts] = useState<CustoViagemPayload[]>([]);

  const {
    custosViagensCompletos,
    adicionarCustoViagem,
    fetchCustosViagensCompletos,
  } = useCustoViagemStore();

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        await viagemController.fetchViagensCompletas();
      } catch (error) {}
    };

    fetchViagens();
    fetchCustosViagensCompletos();
  }, []);

  const handleAddCost = () => {
    setIsModalOpen(true);
    setModalMode("create");
    setSelectedCost(null);
  };

  const handleEditCost = (cost: CustoViagemPayload) => {
    setModalMode("edit");
    setSelectedCost(cost);
    setIsModalOpen(true);
  };

  const handleDeleteCost = (cost: CustoViagemPayload) => {
    // Lógica para excluir o custo
    console.log("Excluir custo:", cost);
  };

  const handleSaveCost = async (costData: CustoViagemPayload) => {
    try {
      await adicionarCustoViagem(costData);
      setIsModalOpen(false);
      setCosts((prev) => [...prev, costData]);
    } catch (error) {
      console.error("Erro ao salvar custo:", error);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchCustosViagensCompletos();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Título e Ações */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Gerenciar Custos de Viagens
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Visualize, adicione e edite custos associados às viagens.
          </p>
        </div>
        <Button
          showArrow={false}
          variant="secondary"
          icon={<Plus className="w-5 h-5" />}
          onClick={handleAddCost}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          Adicionar Custo
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4">
        <FilterableDropdown
          options={viagensCompletas.map((viagem) => ({
            id: viagem.id?.toString() ?? "",
            label: `${viagem.origem} → ${viagem.destino}`,
          }))}
          placeholder="Viagem"
          value={null}
          onChange={(option) => console.log("Filtro de viagem:", option)}
        />
      </div>

      {/* Tabela */}
      <DataTable
        data={custosViagensCompletos}
        columns={custoViagemColumns}
        actions={CustoViagemActions(handleEditCost, handleDeleteCost)}
        title="Custos Cadastrados"
        subtitle="Gerencie os custos associados às viagens"
        filterPlaceholder="Buscar custos..."
        emptyStateConfig={{
          title: "Nenhum custo encontrado",
          description: "Adicione custos para começar a gerenciar.",
          showCreateButton: false,
          onCreateClick: handleAddCost,
        }}
      />

      {/* Modal de Adicionar/Editar */}
      <CustoFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        viagem={
          selectedCost
            ? viagensCompletas.find(
                (v) => v.id?.toString() === selectedCost.viagemId
              ) || null
            : null
        }
        custo={
          selectedCost
            ? custosViagensCompletos.find(
                (c) => c.id === (selectedCost as any).id
              ) || null
            : null
        }
        onSave={handleSaveCost}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default GerenciarCustos;
