import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4 text-white">
            JT Softwares LTDA
          </h3>
          <p className="text-gray-300 dark:text-gray-400 mb-4">
            Desenvolvendo soluções tecnológicas inovadoras
          </p>
          {/* <div className="flex justify-center space-x-4 mb-4">
            <Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
          </div> */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} JT Softwares LTDA. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
