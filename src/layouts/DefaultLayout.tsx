import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function DefaultLayout() {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header
        isSidebarHovered={isSidebarHovered}
        setIsSidebarHovered={setIsSidebarHovered}
      />
      <Toaster position="top-right" />

      <Sidebar isHovered={isSidebarHovered} setIsHovered={setIsSidebarHovered}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 p-4 w-full">
            <Outlet />
          </main>
        </div>
      </Sidebar>
      <Footer />
    </div>
  );
}
