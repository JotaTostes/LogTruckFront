import React from "react";
import { Button as CustomButton } from "../../components/ui/Button";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { X, UserPlus, Edit3, Sparkles, type LucideIcon } from "lucide-react";

interface FormModalProps {
  // Controle básico da modal
  open: boolean;
  onClose: () => void;
  
  // Configuração do conteúdo
  title: string;
  subtitle?: string;
  isEdit?: boolean;
  
  // Ícones personalizáveis
   icon?: React.ReactNode;
  editIcon?: LucideIcon;
  createIcon?: LucideIcon;
  
  // Conteúdo do formulário
  children: React.ReactNode;
  
  // Configurações opcionais
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  showStatusIndicator?: boolean;
  statusText?: string;
  
  // Configurações do footer
  showDefaultActions?: boolean;
  customFooter?: React.ReactNode;
  
  // Loading state
  isLoading?: boolean;
  loadingText?: string;
  
  // Classes customizáveis
  className?: string;
  contentClassName?: string;
}

export default function FormModal({
  open,
  onClose,
  title,
  subtitle,
  isEdit = false,
  icon,
  editIcon = Edit3,
  createIcon = UserPlus,
  children,
  size = "md",
  showStatusIndicator = true,
  statusText,
  showDefaultActions = true,
  customFooter,
  isLoading = false,
  loadingText,
  className = "",
  contentClassName = "",
}: FormModalProps) {
  // Determina qual ícone usar
  // const IconComponent = icon || (isEdit ? editIcon : createIcon);
  const IconNode = icon
    ? typeof icon === "function"
      ? React.createElement(icon, { className: "h-6 w-6 text-white" })
      : icon
    : React.createElement(isEdit ? editIcon : createIcon, { className: "h-6 w-6 text-white" });
  
  // Textos padrão baseados no modo
  const defaultSubtitle = isEdit 
    ? `Atualize as informações do ${title.toLowerCase()}`
    : `Preencha os dados para criar um novo ${title.toLowerCase()}`;
    
  const defaultStatusText = isEdit ? "Modo de Edição" : "Criação de Registro";
  const defaultLoadingText = isEdit ? `Atualizando ${title.toLowerCase()}...` : `Criando ${title.toLowerCase()}...`;

  // Define largura máxima baseada no size
  const sizeClasses = {
    xs: "max-w-md",
    sm: "max-w-lg", 
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    xxl: "max-w-7xl"
  };

  // Se não estiver aberta, não renderiza nada
  if (!open) return null;

  return (
    <>
      {/* Backdrop com blur */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Posicionamento fixo e centralizado */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`pointer-events-auto relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-2xl"></div>

          {/* Header com design moderno */}
          <div className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 px-8 py-6 border-b border-white/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Ícone animado */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                    {/* <IconComponent className="h-6 w-6 text-white" /> */}
                    {IconNode}
                  </div>
                </div>

                {/* Título e subtítulo */}
                <div>
                  <Typography
                    variant="h3"
                    className="font-bold text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                  >
                    {isEdit ? `Editar ${title}` : `Novo ${title}`}
                  </Typography>
                  <p className="text-slate-500 text-sm mt-1 font-medium">
                    {subtitle || defaultSubtitle}
                  </p>
                </div>
              </div>

              {/* Botão de fechar estilizado */}
              <button
                onClick={onClose}
                className="group relative p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-red-50 hover:border-red-200"
                disabled={isLoading}
              >
                <X className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Body com scroll personalizado */}
          <div className={`relative px-8 py-6 overflow-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 ${contentClassName}`}>
            {/* Indicador de progresso visual */}
            {showStatusIndicator && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-600">
                    {statusText || defaultStatusText}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>
            )}

            {/* Container do formulário com background sutil */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-sm">
              {children}
            </div>
          </div>

          {/* Footer condicional */}
          {(showDefaultActions || customFooter) && (
            <div className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 px-8 py-6 border-t border-white/50 flex-shrink-0">
              {customFooter || (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Informação adicional */}
                  <div className="hidden sm:flex items-center gap-2 text-slate-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      {isEdit ? "Pronto para atualizar" : "Pronto para criar"}
                    </span>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
                    <CustomButton
                      onClick={onClose}
                      disabled={isLoading}
                      className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      showArrow={false}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </CustomButton>

                    {/* Botão submit será controlado pelo formulário interno */}
                    <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
                      <span>Use o botão</span>
                      <div className="px-2 py-1 bg-blue-100 rounded text-blue-600 font-mono text-xs">
                        {isEdit ? "Salvar" : "Criar"}
                      </div>
                      <span>no formulário</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Indicador de loading/submissão */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-3xl z-10">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-slate-600 font-medium">
                  {loadingText || defaultLoadingText}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}