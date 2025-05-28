import Header from "../components/ui/Header";
import Sidebar from "../components/ui/Sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
