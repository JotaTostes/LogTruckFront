import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
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
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  children: React.ReactNode;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const Sidebar = ({ children, isHovered, setIsHovered }: SidebarProps) => {
  const { pathname } = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <ChartColumnIncreasing size={18} />,
    },
    { label: "Usuários", to: "/usuarios", icon: <Users size={18} /> },
    { label: "Motoristas", to: "/motoristas", icon: <IdCard size={18} /> },
    { label: "Viagens", to: "/viagens", icon: <MapPinned size={18} /> },
    { label: "Caminhões", to: "/caminhoes", icon: <Truck size={18} /> },
    {
      label: "Centro de Custos",
      icon: <DollarSign size={18} />,
      submenu: [
        {
          label: "Comissões a Pagar",
          to: "/custos/comissoes",
          icon: <Receipt size={16} />,
        },
        // Adicione mais itens do submenu aqui
      ],
    },
    { label: "Configurações", to: "/config", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex flex-1">
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
          {/* ...existing header code... */}

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
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
                        openSubmenu === item.label && "bg-white bg-opacity-20"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span className="whitespace-nowrap">{item.label}</span>
                      </div>
                      <ChevronRight
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          openSubmenu === item.label && "transform rotate-90"
                        )}
                      />
                    </div>
                    {/* Submenu */}
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
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 transition-all duration-300">{children}</main>
    </div>
  );
};

export default Sidebar;
