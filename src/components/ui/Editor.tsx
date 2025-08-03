import React from "react";
import CodeMirror, { type ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";
import { gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";

interface EditorProps extends ReactCodeMirrorProps {
  onChange: (value: string) => void;
  preferredDark: boolean;
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  preferredDark,
  id = "client-com",
  ...rest
}) => {
  const onChangeHandler = React.useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <CodeMirror
      height="var(--min-body-height)"
      theme={preferredDark ? githubDark : gruvboxLight}
      extensions={[html({ selfClosingTags: false })]}
      onChange={onChangeHandler}
      id={id}
      {...rest}
    />
  );
};

export default Editor;
