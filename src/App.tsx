import React from "react";

// Contexts
import EditorContext from "./context/EditorContext";

// Components
import JSEditor from "./components/editor/JSEditor";
import XMLEditor from "./components/editor/XMLEditor";
import HTMLEditor from "./components/editor/HTMLEditor";
import Header from "./components/layout/Header";

function App() {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const preferredDark = editorStore?.preferredDark;
  const selectedLanguage = editorStore?.selectedLanguage;

  React.useEffect(() => {
    document.body?.setAttribute("pref-color", preferredDark ? "dark" : "light");
  }, [preferredDark]);

  return (
    <div className="gws-live-preview">
      <div className="grid gap-20">
        <Header />

        {selectedLanguage === "html" && <HTMLEditor />}

        {selectedLanguage === "xml" && <XMLEditor />}

        {selectedLanguage === "js" && <JSEditor />}
      </div>

      {/* <InstallPWAPrompt /> */}
    </div>
  );
}

export default App;
