import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { APP_VERSION } from "../../config/version";
import {
  Users,
  Truck,
  Settings,
  ChartColumnIncreasing,
  IdCard,
  MapPinned,
  DollarSign,
  ChevronRight,
  Receipt,
  MapPinCheck,
  BanknoteArrowDown,
  UserCheck,
} from "lucide-react";
import { systemTheme } from "../../config/systemTheme";

interface SidebarProps {
  children: React.ReactNode;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const Sidebar = ({ children, isHovered, setIsHovered }: SidebarProps) => {
  const { pathname } = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navSections = [
    {
      title: "Principal",
      items: [
        {
          label: "Dashboard",
          to: "/dashboard",
          icon: <ChartColumnIncreasing size={18} />,
          description: "Visão geral do sistema",
        },
      ],
    },
    {
      title: "Gestão",
      items: [
        {
          label: "Usuários",
          to: "/usuarios",
          icon: <Users size={18} />,
          description: "Gerencie os usuários do sistema",
        },
        {
          label: "Motoristas",
          icon: <IdCard size={18} />,
          description: "Lista e gerenciamento de motoristas",
          submenu: [
            {
              label: "Cadastrar Motoristas",
              to: "/motoristas",
              icon: <IdCard size={16} />,
              description: "Cadastro e gerenciamento de motoristas",
            },
            {
              label: "Reativar Motoristas",
              to: "/motoristas/reativar",
              icon: <UserCheck size={16} />,
              description: "Reative motoristas deletados",
            },
          ],
        },
        {
          label: "Viagens",
          icon: <MapPinned size={18} />,
          description: "Gerencie e aprove viagens",
          submenu: [
            {
              label: "Cadastrar Viagens",
              to: "/viagens",
              icon: <MapPinned size={16} />,
              description: "Lista e gerenciamento de viagens",
            },
            {
              label: "Aprovar Viagens",
              to: "/viagens/aprovar",
              icon: <MapPinCheck size={16} />,
              description: "Aprovação de viagens em planejamento",
            },
          ],
        },
        {
          label: "Caminhões",
          to: "/caminhoes",
          icon: <Truck size={18} />,
          description: "Gerencie os caminhões cadastrados",
        },
      ],
    },
    {
      title: "Financeiro",
      items: [
        {
          label: "Centro de Custos",
          icon: <DollarSign size={18} />,
          description: "Controle financeiro e custos",
          submenu: [
            {
              label: "Comissões a Pagar",
              to: "/custos/comissoes",
              icon: <Receipt size={16} />,
              description: "Gerencie as comissões pendentes",
            },
            {
              label: "Pendências Veiculares",
              to: "/custos/pendenciasVeiculares",
              icon: <BanknoteArrowDown size={16} />,
              description:
                "Gerencie os débitos dos caminhões (IPVA, Licenciamento, etc.)",
            },
          ],
        },
      ],
    },
    {
      title: "Configurações",
      items: [
        {
          label: "Configurações",
          to: "/config",
          icon: <Settings size={18} />,
          description: "Ajuste as configurações do sistema",
        },
      ],
    },
  ];

  return (
    <div className={systemTheme.colors.background.sidebar}>
      <aside
        className={cn(
          "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white transition-all duration-300 ease-in-out overflow-hidden",
          isHovered ? "w-64" : "w-0"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setOpenSubmenu(null);
        }}
      >
        <div
          className={cn(
            "p-4 w-64 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <nav className="flex flex-col gap-4">
            {navSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-white/60 uppercase mb-2">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {section.items.map((item) => (
                    <div key={item.label}>
                      {item.submenu ? (
                        <div
                          className="relative"
                          onMouseEnter={() => setOpenSubmenu(item.label)}
                          onMouseLeave={() => setOpenSubmenu(null)}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 cursor-pointer",
                              openSubmenu === item.label &&
                                "bg-white bg-opacity-20"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex-shrink-0">{item.icon}</span>
                              <span className="whitespace-nowrap">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight
                              size={16}
                              className={cn(
                                "transition-transform duration-200",
                                openSubmenu === item.label &&
                                  "transform rotate-90"
                              )}
                            />
                          </div>
                          {openSubmenu === item.label && (
                            <div className="pl-4 mt-1 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.to}
                                  to={subItem.to}
                                  className={cn(
                                    "flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 hover:translate-x-1",
                                    pathname === subItem.to &&
                                      "bg-white bg-opacity-20 font-semibold"
                                  )}
                                >
                                  <span className="flex-shrink-0">
                                    {subItem.icon}
                                  </span>
                                  <span className="whitespace-nowrap">
                                    {subItem.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.to!}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 hover:translate-x-1",
                            pathname.startsWith(item.to!) &&
                              "bg-white bg-opacity-20 font-semibold"
                          )}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span className="whitespace-nowrap">
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
              <span>
                v{APP_VERSION.current}
                {APP_VERSION.environment === "development" && " · Dev"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 transition-all duration-300">{children}</main>
    </div>
  );
};

export default Sidebar;
