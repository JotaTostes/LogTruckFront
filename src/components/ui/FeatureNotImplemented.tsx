import React, { useState, useEffect } from "react";
import { Construction, ArrowLeft, Clock, Zap, Sparkles } from "lucide-react";

const FeatureNotImplemented = ({
  featureName = "Esta funcionalidade",
  onGoBack = () => window.history.back(),
  estimatedTime = "em breve",
  showAnimation = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  type Sparkle = {
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
  };
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setIsVisible(true);

    if (showAnimation) {
      // Gerar sparkles animados
      const newSparkles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      }));
      setSparkles(newSparkles);
    }
  }, [showAnimation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Animated sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className={`max-w-2xl w-full text-center relative z-10 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Icon container with floating animation */}
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl animate-bounce">
            <Construction className="w-16 h-16 text-white" />
          </div>

          {/* Floating elements around icon */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full animate-pulse"></div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-pulse">
          Ops! Ainda não chegamos aqui
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
          {featureName} está sendo cuidadosamente construída 🚧
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl shadow-slate-200/50 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4 mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Super Rápida</h3>
            <p className="text-sm text-gray-600">
              Otimizada para performance máxima
            </p>
          </div>

          <div
            className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl shadow-slate-200/50 transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Intuitiva</h3>
            <p className="text-sm text-gray-600">Interface pensada para você</p>
          </div>

          <div
            className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl shadow-slate-200/50 transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl mb-4 mx-auto">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Em Breve</h3>
            <p className="text-sm text-gray-600">Chegando {estimatedTime}</p>
          </div>
        </div>

        {/* Status message */}
        <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-blue-200/50">
          <div className="flex items-center justify-center mb-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
          <p className="text-gray-700 font-medium">
            Nossa equipe está trabalhando duro para trazer essa funcionalidade
            para você!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Enquanto isso, que tal explorar outras áreas do sistema?
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGoBack}
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Voltar
          </button>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="group inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-xl text-gray-700 font-semibold rounded-2xl shadow-2xl shadow-slate-200/50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/30 hover:bg-white/95"
          >
            Ir para Dashboard
            <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>

        {/* Footer message */}
        <p className="mt-8 text-sm text-gray-500">
          Tem alguma sugestão? Entre em contato com nossa equipe!
        </p>
      </div>
    </div>
  );
};

export default FeatureNotImplemented;
