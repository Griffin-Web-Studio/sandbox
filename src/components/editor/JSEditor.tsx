import React from "react";
import Editor from "../ui/Editor";
import EditorContext from "@/context/EditorContext";

interface JSEditorProps {
  preferredDark: boolean;
}

const JSEditor: React.FC<JSEditorProps> = ({ preferredDark }) => {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const setEditorStore = editorContext?.setEditorStore;

  const onEditorChangeHandler = React.useCallback(
    (value: string) => {
      if (!setEditorStore) return;
      localStorage.setItem("js_code", value);
      setEditorStore((old) => ({
        ...old,
        codeStore: { ...old.codeStore, js: value },
      }));
    },
    [setEditorStore]
  );

  return (
    <>
      <div className="grid-24 grid-lt-12">
        <div className="gws-live-preview__code-block">
          <Editor
            onChange={onEditorChangeHandler}
            value={editorStore?.codeStore.js}
            preferredDark={preferredDark}
            language="js"
          />
        </div>
      </div>

      <div className="grid-24 grid-lt-12">
        <button>Run Code</button>
        <div id="console"></div>
        <input
          type="text"
          id="input"
          placeholder="Type additional commands here..."
        />
        <iframe
          srcDoc={localStorage.getItem("js_code") ?? ""}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default JSEditor;
