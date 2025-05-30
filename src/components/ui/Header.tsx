import { useAuthStore } from "../../store/authStore";
import { LogOut, Menu } from "lucide-react";

interface HeaderProps {
  isSidebarHovered: boolean;
  setIsSidebarHovered: (hovered: boolean) => void;
}

const Header = ({ isSidebarHovered, setIsSidebarHovered }: HeaderProps) => {
  const { usuario, logout } = useAuthStore();

  return (
    <header className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Ícone do Menu */}
          <div
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
            onMouseEnter={() => setIsSidebarHovered(true)}
            title="Menu"
          >
            <Menu size={20} className="text-white" />
          </div>

          {/* Logo */}
          <img
            src="/logtruck-logo.png"
            alt="Logotipo LogTruck"
            className="h-8 w-auto"
          />
        </div>

        {/* Usuário + Logout */}
        <div className="flex items-center gap-3">
          {usuario && (
            <span className="text-sm text-gray-300">
              Olá, <strong className="text-white">{usuario.nome}</strong>
            </span>
          )}
          <button
            onClick={logout}
            className="p-2 rounded-md text-red-400 hover:bg-red-500 hover:bg-opacity-20 transition-colors"
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
