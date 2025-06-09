export const systemTheme = {
  colors: {
    primary: {
      main: "#3B82F6", // Blue-600
      dark: "#2563EB", // Blue-700
      light: "#60A5FA", // Blue-400
      gradient: "from-blue-600 to-indigo-600",
      hover: "hover:from-blue-700 hover:to-indigo-700",
    },
    secondary: {
      main: "#6366F1", // Indigo-600
      dark: "#4F46E5", // Indigo-700
      light: "#818CF8", // Indigo-400
    },
    background: {
      main: "from-gray-50 via-blue-50 to-indigo-50",
      card: "bg-white/90",
      modal: "bg-white/95",
      sidebar: "flex flex-1 from-gray-800 via-gray-700 to-gray-800",
      header:
        "w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white",
      footer:
        "w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white",
    },
  },
  components: {
    button: {
      primary:
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
      success:
        "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
      danger:
        "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700",
      secondary:
        "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
      ghost: "text-blue-600 hover:bg-blue-100",
    },
    card: {
      base: "bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-200/50",
      header:
        "bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200/50",
    },
    modal: {
      base: "bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl",
      header: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
  },
};
