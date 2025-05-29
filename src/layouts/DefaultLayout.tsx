import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";

export default function DefaultLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

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
