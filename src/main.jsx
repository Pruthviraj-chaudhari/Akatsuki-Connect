import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { HashRouter } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import "./index.css";
import AppContextProvider from "./contexts/AppContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <HashRouter>
        <App />
        <Toaster position="top-right" />
      </HashRouter>
    </AppContextProvider>
  </React.StrictMode>
)
