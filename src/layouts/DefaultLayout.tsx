import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";
import { Toaster } from "react-hot-toast";

export default function DefaultLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      <Toaster position="top-right" />
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
