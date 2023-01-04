import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubDark } from "@uiw/codemirror-theme-github";

export default function CodemirrorInput(props) {
    const onChange = React.useCallback((value, viewUpdate) => {
        // console.log("value:", value);
    }, []);
    
    return(
        <CodeMirror
        value={props.value}
        height="100%"
        theme={githubDark}
        extensions={[html({ selfClosingTags: false })]}
        onChange={onChange}
        id="gwssc-client-com"
        className="gwssc-code-child"
        />
    )
}