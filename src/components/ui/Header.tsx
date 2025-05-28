import { useAuthStore } from "../../store/authStore";
import { LogOut } from "lucide-react";

const Header = () => {
  const { usuario, logout } = useAuthStore();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logtruck-logo.png"
            alt="Logotipo LogTruck"
            className="h-10 w-auto"
          />
        </div>

        <div className="flex items-center gap-4">
          {usuario && (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Olá, <strong>{usuario.nome}</strong>
            </span>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
