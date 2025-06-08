import { useAuthStore } from "../../store/authStore";
import { LogOut, Menu } from "lucide-react";

interface HeaderProps {
  isSidebarHovered: boolean;
  setIsSidebarHovered: (hovered: boolean) => void;
}

// Função para pegar as iniciais do nome (ex: "João Silva" => "JS")
const getInitials = (name: string = ""): string => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean) // Garante que não haja undefined se houver espaços extras
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const Header = ({ isSidebarHovered, setIsSidebarHovered }: HeaderProps) => {
  const { usuario, logout } = useAuthStore();

  // Chame a função para obter as iniciais
  const userInitials = usuario ? getInitials(usuario.nome) : "";

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
          <div className="flex items-center gap-2">
            <img
              src="/logtruck-logo-header-white.png"
              alt="Logotipo LogTruck"
              className="h-8 w-auto object-contain drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
            />
          </div>
        </div>

        {/* Usuário + Logout */}
        <div className="flex items-center gap-3">
          {usuario && (
            // Usamos um Fragment <> para agrupar os elementos do usuário
            <>
              {/* NOVO: Círculo com as iniciais do usuário */}
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm"
                title={usuario.nome} // Mostra o nome completo ao passar o mouse
              >
                {userInitials}
              </div>

              <span className="text-sm text-gray-300 hidden sm:block">
                {" "}
                {/* Opcional: esconde o nome em telas pequenas */}
                Olá, <strong className="text-white">{usuario.nome}</strong>
              </span>
            </>
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
