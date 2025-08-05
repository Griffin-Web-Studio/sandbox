import React from "react";

export interface editorStoreValues {
  codeStore: {
    html: string;
    svg: string;
    js: string;
  };
}

export interface EditorContextType {
  editorStore: editorStoreValues;
  setEditorStore: React.Dispatch<React.SetStateAction<editorStoreValues>>;
}

const EditorContext = React.createContext<EditorContextType | undefined>(
  undefined
);

export default EditorContext;
