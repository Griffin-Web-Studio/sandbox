import React from "react";
import Editor from "../ui/Editor";
import EditorContext from "@/context/EditorContext";

interface HTMLEditorProps {
  preferredDark: boolean;
}

const HTMLEditor: React.FC<HTMLEditorProps> = ({ preferredDark }) => {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const setEditorStore = editorContext?.setEditorStore;

  const onEditorChangeHandler = React.useCallback(
    (value: string) => {
      if (!setEditorStore) return;
      localStorage.setItem("html_code", value);
      setEditorStore((old) => ({
        ...old,
        codeStore: { ...old.codeStore, html: value },
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
            value={editorStore?.codeStore.html}
            preferredDark={preferredDark}
            language="html"
          />
        </div>
      </div>

      <div className="grid-24 grid-lt-12">
        <iframe
          srcDoc={localStorage.getItem("html_code") ?? ""}
          className="gws-live-preview__code-preview flex align-center justify-center"
          title="Preview Frame"
        />
      </div>
    </>
  );
};

export default HTMLEditor;
