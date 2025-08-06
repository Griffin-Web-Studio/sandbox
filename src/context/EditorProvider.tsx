import React from "react";

// Context
import EditorContext, { type editorStoreValues } from "./EditorContext";

// Types
import type { supportedLanguages } from "@/components/ui/Editor";
import type { option } from "@/components/ui/Selector";
import { CodeSampleGenerator } from "@/utils/sample";

export interface languageOption extends option {
  value: supportedLanguages;
}
export interface EditorProviderProps {
  children: React.ReactNode;
}

if (!localStorage.getItem("html_code"))
  localStorage.setItem(
    "html_code",
    await CodeSampleGenerator.generateLanguageSample("html")
  );
if (!localStorage.getItem("xml_code"))
  localStorage.setItem(
    "xml_code",
    await CodeSampleGenerator.generateLanguageSample("xml")
  );
if (!localStorage.getItem("js_code"))
  localStorage.setItem(
    "js_code",
    await CodeSampleGenerator.generateLanguageSample("js")
  );

const defaultValue: editorStoreValues = {
  codeStore: {
    html: localStorage.getItem("html_code") ?? "",
    xml: localStorage.getItem("xml_code") ?? "",
    js: localStorage.getItem("js_code") ?? "",
  },
  codeSelection: [
    {
      label: "HTML",
      value: "html",
      selected: true,
    },
    {
      label: "XML",
      value: "xml",
      selected: false,
    },
    {
      label: "JS",
      value: "js",
      selected: false,
    },
  ],
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
