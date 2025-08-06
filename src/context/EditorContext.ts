import React from "react";
import type { languageOption } from "./EditorProvider";

export interface editorStoreValues {
  codeStore: {
    html: string;
    xml: string;
    js: string;
  };
  codeSelection: languageOption[];
}

export interface EditorContextType {
  editorStore: editorStoreValues;
  setEditorStore: React.Dispatch<React.SetStateAction<editorStoreValues>>;
}

const EditorContext = React.createContext<EditorContextType | undefined>(
  undefined
);

export default EditorContext;
