import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import "./index.css";
import { systemTheme } from "./config/systemTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <div className={systemTheme.colors.background.main}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </React.StrictMode>
  </>
);
