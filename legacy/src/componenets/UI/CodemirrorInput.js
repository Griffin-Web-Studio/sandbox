import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";
import { gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";

export default function CodemirrorInput(props) {
    const { onInputChange, themeColor } = props;

    const onChange = React.useCallback((value, viewUpdate) => {
        onInputChange(value);
    }, [onInputChange]);
    
    return(
        <CodeMirror
        value={props.value}
        height="var(--min-body-height)"
        theme={themeColor === 'light' ? gruvboxLight : githubDark}
        extensions={[html({ selfClosingTags: false })]}
        onChange={onChange}
        id="client-com"
        className=""
        />
    )
}