import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            JT Softwares LTDA
          </span>
          . Todos os direitos reservados.
        </p>

        {/* <div className="flex space-x-4 mt-4 sm:mt-0">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
          >
            Política de Privacidade
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
          >
            Termos
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
          >
            Contato
          </a>
        </div> */}
      </div>
    </footer>
  );
};
