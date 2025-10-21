// DashCard.tsx

type DashCardProps = {
  title: string;
  value: string | number;
  color?: "blue" | "green" | "purple" | "orange" | "red" | "indigo" | "yellow";
};

export function DashCard({ title, value, color = "yellow" }: DashCardProps) {
  const colorClasses = {
    blue: "from-blue-500/10 to-blue-600/10 border-blue-200",
    green: "from-green-500/10 to-green-600/10 border-green-200",
    purple: "from-purple-500/10 to-purple-600/10 border-purple-200",
    orange: "from-orange-500/10 to-orange-600/10 border-orange-200",
    red: "from-red-500/10 to-red-600/10 border-red-200",
    indigo: "from-indigo-500/10 to-indigo-600/10 border-indigo-200",
    yellow: "from-yellow-500/10 to-yellow-600/10 border-yellow-200",
  };

  return (
    <div
      className={`
      relative overflow-hidden
      bg-gradient-to-br ${colorClasses[color]}
      backdrop-blur-sm
      border rounded-2xl p-6
      transition-all duration-200
      hover:shadow-lg hover:shadow-blue-500/10
      hover:-translate-y-1
      group
    `}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gray-400 rounded-full transform translate-x-16 -translate-y-16"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-3 text-center">
        <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h2>

        <p className="text-3xl font-bold text-gray-900 tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
}
