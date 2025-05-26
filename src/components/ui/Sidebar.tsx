import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { Users, Truck, Settings } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Usuários", to: "/usuarios", icon: <Users size={18} /> },
    { label: "Viagens", to: "/viagens", icon: <Truck size={18} /> },
    { label: "Configurações", to: "/config", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">LogTruck</h1>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex items-center gap-2 p-2 rounded hover:bg-gray-800 transition",
              pathname.startsWith(item.to) && "bg-gray-800 font-semibold"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
