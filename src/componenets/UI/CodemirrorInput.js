import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";

export default function CodemirrorInput(props) {
    const { onInputChange } = props;

    const onChange = React.useCallback((value, viewUpdate) => {
        onInputChange(value);
    }, [onInputChange]);
    
    return(
        <CodeMirror
        value={props.value}
        height="100vh"
        theme={githubDark}
        extensions={[html({ selfClosingTags: false })]}
        onChange={onChange}
        id="client-com"
        className=""
        />
    )
}