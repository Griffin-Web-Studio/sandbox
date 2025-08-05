import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// styles
import "./sass/style.sass";

// Contexts
import EditorProvider from "./context/EditorProvider.tsx";

// Components
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </StrictMode>
);
