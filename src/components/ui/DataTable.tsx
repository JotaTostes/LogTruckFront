import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "./mt/MTCard";
import { MTTypography as Typography } from "./mt/MTTypography";
import { MTIconBtt as IconButton } from "./mt/MTIcon";
import { Input } from "./Input";
import {
  Search,
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileText,
  Database,
  SearchX,
  Inbox,
  FolderOpen,
} from "lucide-react";

import { systemTheme } from "../../config/systemTheme";

export interface ActionButton<T> {
  icon: React.ReactNode;
  onClick: (item: T) => void;
  color?: "blue" | "red" | "green" | "amber" | "blue-gray";
  title?: string;
  show?: (item: T) => boolean;
}

export type Column<T> = {
  key: string;
  label: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
  filtrable?: boolean;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
  onFilter?: (filtered: T[]) => void;
  filterPlaceholder?: string;
  actions?: ActionButton<T>[];
  emptyStateConfig?: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    showCreateButton?: boolean;
    createButtonText?: string;
    onCreateClick?: () => void;
  };
};

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  title,
  subtitle,
  loading,
  onFilter,
  filterPlaceholder = "Buscar...",
  actions,
  emptyStateConfig,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [filterColumn, setFilterColumn] = useState("all");
  const itemsPerPage = 5;

  const filterableColumns = useMemo(
    () => columns.filter((c) => c.filtrable),
    [columns]
  );

  const filteredData = useMemo(() => {
    if (!filterText) return data;

    return data.filter((item) => {
      // Se o filtro selecionado for 'all', busca em todas as colunas marcadas como 'filterable'
      if (filterColumn === "all") {
        return filterableColumns.some((column) => {
          const value = (item as any)[column.key];
          return value
            ?.toString()
            .toLowerCase()
            .includes(filterText.toLowerCase());
        });
      }

      // Se uma coluna específica foi selecionada, busca apenas nela
      const value = (item as any)[filterColumn];
      return value?.toString().toLowerCase().includes(filterText.toLowerCase());
    });
  }, [data, filterText, filterColumn, filterableColumns]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterTextChange = (value: string) => {
    setFilterText(value);
    setCurrentPage(1);
    // if (onFilter) {
    //   onFilter(filterData(data));
    // }
  };

  // Função para renderizar o estado vazio
  const renderEmptyState = () => {
    const isFiltered = filterText.length > 0;
    const hasData = data.length > 0;

    // Configuração padrão baseada no contexto
    const getDefaultConfig = () => {
      if (isFiltered && hasData) {
        return {
          icon: <SearchX className="w-16 h-16 text-gray-400" />,
          title: "Nenhum resultado encontrado",
          description: `Não encontramos registros que correspondam à busca "${filterText}". Tente ajustar os filtros ou usar outros termos.`,
          showCreateButton: false,
        };
      } else if (!hasData) {
        return {
          icon: <Inbox className="w-16 h-16 text-gray-400" />,
          title: "Nenhum registro cadastrado",
          description:
            "Ainda não há dados para exibir. Que tal começar criando o primeiro registro?",
          showCreateButton: true,
          createButtonText: "Criar primeiro registro",
        };
      } else {
        return {
          icon: <Database className="w-16 h-16 text-gray-400" />,
          title: "Dados não encontrados",
          description: "Não há registros disponíveis no momento.",
          showCreateButton: false,
        };
      }
    };

    const defaultConfig = getDefaultConfig();
    const config = { ...defaultConfig, ...emptyStateConfig };

    return (
      <tr>
        <td
          colSpan={actions ? columns.length + 1 : columns.length}
          className="text-center p-12"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Ícone com animação sutil */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full p-6 border border-blue-100">
                {config.icon}
              </div>
            </div>

            {/* Textos */}
            <div className="space-y-2">
              <Typography
                variant="h6"
                color="blue-gray"
                className="font-semibold"
              >
                {config.title}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="max-w-md text-center leading-relaxed"
              >
                {config.description}
              </Typography>
            </div>

            {/* Botão de ação (opcional) */}
            {config.showCreateButton && (
              <div className="pt-4">
                <button
                  onClick={config.onCreateClick}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  {config.createButtonText || "Criar registro"}
                </button>
              </div>
            )}

            {/* Dicas adicionais para busca sem resultado */}
            {isFiltered && hasData && (
              <div className="pt-2">
                <button
                  onClick={() => setFilterText("")}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <Card className="w-full max-w-[98vw] mx-auto bg-white rounded-xl shadow-xl">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Typography variant="h5" color="white">
                {title}
              </Typography>
              {subtitle && (
                <Typography color="white" className="opacity-80 font-normal">
                  {subtitle}
                </Typography>
              )}
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2">
              {/* Dropdown para selecionar a coluna */}
              <div className="w-full md:w-48 relative">
                <select
                  value={filterColumn}
                  onChange={(e) => setFilterColumn(e.target.value)}
                  className="w-full appearance-none bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="all" className="text-black">
                    Todas as Colunas
                  </option>
                  {filterableColumns.map((col) => (
                    <option
                      key={col.key}
                      value={col.key}
                      className="text-black"
                    >
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-72 relative">
                <Input
                  icon={<Search className="h-5 w-5 text-white/60" />}
                  type="search"
                  value={filterText}
                  onChange={(e: any) => handleFilterTextChange(e.target.value)}
                  placeholder={filterPlaceholder}
                  className="bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-x-auto px-0">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-blue-gray-100 p-4"
                  style={{ width: column.width }}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {column.label}
                  </Typography>
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="border-b border-blue-gray-100 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Ações
                  </Typography>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={actions ? columns.length + 1 : columns.length}
                  className="text-center p-4"
                >
                  <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              renderEmptyState()
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-blue-50/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="p-4">
                      {column.render
                        ? column.render(item)
                        : (item as any)[column.key]}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {actions.map(
                          (action, index) =>
                            action.show?.(item) !== false && (
                              <IconButton
                                key={index}
                                variant="text"
                                color={action.color}
                                onClick={() => action.onClick(item)}
                                className="h-8 w-8 rounded-lg hover:bg-blue-50"
                                title={action.title}
                              >
                                {action.icon}
                              </IconButton>
                            )
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Typography variant="small" color="blue-gray" className="font-medium">
          Página {currentPage} de {totalPages}
        </Typography>
        <div className="flex gap-2">
          <IconButton
            variant="text"
            color="blue"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg hover:bg-blue-100"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="text"
            color="blue"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg hover:bg-blue-100"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </CardFooter>
    </Card>
  );
}
