// check dark mode: https://blog.logrocket.com/dark-mode-in-react-an-in-depth-guide/
// https://github.com/rfoel/use-prefers-color-scheme

import React, { useState, useEffect } from "react";
import usePrefersColorScheme from 'use-prefers-color-scheme'
import fileContents from "./images/logo.svg";
import { ReactComponent as LightDark } from "./images/light-dark.svg";
import { ReactComponent as GWSlogo } from "./images/gws-logo.svg";
import { InstallPWAPrompt } from "./componenets/InstallPWAPropt";
import CodemirrorInput from "./componenets/UI/CodemirrorInput";

function App() {
    const ThemeMode = usePrefersColorScheme();
    const [preferredTheme, setPreferredTheme] = useState('none');
    const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
    const [codeBlock, setCodeBlock] = useState("");

    useEffect(() => {
        fetch(fileContents)
            .then((response) => response.text())
            .then((text) => {
                if (isPreviewLoaded) return;
                setCodeBlock(text);
                setIsPreviewLoaded(true);
            });
    }, [isPreviewLoaded, setCodeBlock, setIsPreviewLoaded]);

    const onCodemirrorInputChangeHandler = (value) => {
        setCodeBlock(value);
    };

    const onButtonResetHandler = () => {
        setIsPreviewLoaded(false);
    };

    const onButtonDarkModeHandler = () => {
        if (preferredTheme === "dark") {
            setPreferredTheme("light");
            document.querySelector("body").setAttribute("pref-color", "light")
        } else {
            setPreferredTheme("dark");
            document.querySelector("body").setAttribute("pref-color", "dark")
        }
    };

    return (
        <div className="gws-svg-prev">
            <div className="grid">
                <header className="header flex justify-space-between align-stretch grid-24">
                    <div className="header__gws-logo">
                        <GWSlogo />
                    </div>

                    <div className="grid col-2 gap-2">
                        <div className="header__preferred-color grid-1 flex align-center">
                            <button className="button" onClick={onButtonDarkModeHandler}>
                                <LightDark className={`header__preferred-color-svg header__preferred-color-svg--${preferredTheme === "none" ? ThemeMode : preferredTheme}`} />
                            </button>
                        </div>

                        <div className="header__reset grid-1 flex align-center">
                            <button className="button" onClick={onButtonResetHandler}>
                                <i className="icon-reset-bold" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid-24 grid-lt-12">
                    <div className="gws-svg-prev__code-block">
                        <CodemirrorInput onInputChange={onCodemirrorInputChangeHandler} value={codeBlock} />
                    </div>
                </div>

                <div className="grid-24 grid-lt-12">
                    <div className="gws-svg-prev__code-preview flex align-center justify-center" dangerouslySetInnerHTML={{ __html: codeBlock }} />
                </div>
            </div>

            <InstallPWAPrompt />
        </div>
    );
}

export default App;
