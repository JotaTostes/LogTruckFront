import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Users, Truck, Settings, ChartColumnIncreasing, IdCard  } from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

const Sidebar = ({ children, isHovered, setIsHovered }: SidebarProps) => {
  const { pathname } = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: <ChartColumnIncreasing size={18} />,
    },
    { label: "Usuários", to: "/usuarios", icon: <Users size={18} /> },
    { label: "Motoristas", to: "/motoristas", icon: <IdCard size={18} /> },
    { label: "Viagens", to: "/viagens", icon: <Truck size={18} /> },
    { label: "Configurações", to: "/config", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white transition-all duration-300 ease-in-out overflow-hidden",
          isHovered ? "w-64" : "w-0"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "p-4 w-64 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Header do sidebar */}
          <div className="mb-6 pt-4">
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>

          {/* Navegação */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200 hover:translate-x-1",
                  pathname.startsWith(item.to) &&
                    "bg-white bg-opacity-20 font-semibold"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 transition-all duration-300">{children}</main>
    </div>
  );
};

export default Sidebar;
