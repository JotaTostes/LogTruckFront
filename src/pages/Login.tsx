import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Truck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (useAuthStore.getState().checkAuth()) {
      navigate("/usuarios");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErro("");

    try {
      const sucesso = await login(email, senha);

      if (sucesso && useAuthStore.getState().isAuthenticated) {
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard", { replace: true });
      } else {
        setErro("E-mail ou senha inválidos");
        toast.error("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErro("Erro interno");
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md relative">
        {/* Header com Logo */}
        <div className="mb-8">
          <div className="bg-white/90 rounded-full p-6 w-48 h-48 mx-auto">
            <img
              src="/logtruck-logo-login.png"
              alt="Logotipo LogTruck"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl relative z-10">
          {/* Header Interno */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Acesso ao Sistema
            </h2>
            <p className="text-gray-600">Entre com suas credenciais</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {erro}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 bg-gray-50 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  disabled={isLoading}
                />
                <span className="ml-2 text-gray-700 text-sm">Lembrar-me</span>
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Esqueceu a senha?
              </button>
            </div> */}

            {/* Submit Button */}
            <Button
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading || !email || !senha}
              className="w-full py-4 text-lg"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Precisa de ajuda?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Contate o suporte
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
