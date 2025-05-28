import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
