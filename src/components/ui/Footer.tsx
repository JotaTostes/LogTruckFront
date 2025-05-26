import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-4 mt-10 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">JT Softwares LTDA</span>. Todos os
        direitos reservados.
      </p>
    </footer>
  );
};
