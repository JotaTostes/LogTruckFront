import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 flex flex-col">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
