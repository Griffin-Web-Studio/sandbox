import React from "react";
import type { languageOption } from "./EditorProvider";
import type { supportedLanguages } from "@/components/ui/Editor";

export interface editorStoreValues {
  codeStore: {
    html: string;
    xml: string;
    js: string;
  };
  codeSelection: languageOption[];
  preferredDark: boolean;
  selectedLanguage: supportedLanguages;
}

export interface EditorContextType {
  editorStore: editorStoreValues;
  setEditorStore: React.Dispatch<React.SetStateAction<editorStoreValues>>;
}

const EditorContext = React.createContext<EditorContextType | undefined>(
  undefined
);

export default EditorContext;
