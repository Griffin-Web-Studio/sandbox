import React from "react";
import EditorContext, { type editorStoreValues } from "./EditorContext";
import { getHtmlSample, getJsSample, getSvgSample } from "@/utils/sample";

export interface EditorProviderProps {
  children: React.ReactNode;
}

if (!localStorage.getItem("html_code"))
  localStorage.setItem("html_code", await getHtmlSample());
if (!localStorage.getItem("svg_code"))
  localStorage.setItem("svg_code", await getSvgSample());
if (!localStorage.getItem("js_code"))
  localStorage.setItem("js_code", await getJsSample());

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
