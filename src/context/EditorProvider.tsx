import React from "react";
import EditorContext, { type editorStoreValues } from "./EditorContext";

export interface EditorProviderProps {
  children: React.ReactNode;
}

const defaultValue: editorStoreValues = {
  codeStore: {
    html: localStorage.getItem("html_code") ?? "",
    svg: localStorage.getItem("svg_code") ?? "",
    js: localStorage.getItem("js_code") ?? "",
  },
};

const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [editorStore, setEditorStore] =
    React.useState<editorStoreValues>(defaultValue);

  const values = React.useMemo(
    () => ({ editorStore, setEditorStore }),
    [editorStore]
  );

  return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
  );
};

export default EditorProvider;
