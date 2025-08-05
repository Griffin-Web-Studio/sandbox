import React from "react";
import CodeMirror, { type ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";

export type supportedLanguages = "html" | "xml" | "js";

interface EditorProps extends ReactCodeMirrorProps {
  onChange: (value: string) => void;
  preferredDark: boolean;
  language: supportedLanguages;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  preferredDark,
  id = "client-com",
  language,
  ...rest
}) => {
  let extensions;
  const onChangeHandler = React.useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange]
  );

  if ("html" === language)
    extensions = [langs.html({ selfClosingTags: false })];
  else if ("xml" === language)
    extensions = [langs.xml({ autoCloseTags: true })];
  else if ("js" === language) extensions = [langs.javascript()];

  return (
    <CodeMirror
      height="var(--min-body-height)"
      theme={preferredDark ? monokai : gruvboxLight}
      extensions={extensions}
      onChange={onChangeHandler}
      id={id}
      {...rest}
    />
  );
};

export default Editor;
