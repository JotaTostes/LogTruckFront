export function formatDaysAgo(date: Date): string {
  const now = new Date();
  // Normaliza ambas as datas para ignorar o horário
  const inputDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = nowDate.getTime() - inputDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  return `${diffDays} dias atrás`;
}
