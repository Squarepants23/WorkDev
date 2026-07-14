import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import { ThemeProvider } from "./context/ThemeContext";

import "./i18n";
import "./index.css";
import "devicon/devicon.min.css";
import App from "./App";

registerSW({
  immediate: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
