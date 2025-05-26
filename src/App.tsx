import { Footer } from "./components/ui/Footer";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
