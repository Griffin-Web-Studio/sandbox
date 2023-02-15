import React, { useState, useEffect, useRef /*useMemo*/ } from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";
import fileContents from "./images/logo.svg";
import { ReactComponent as AppLogo } from "./images/logo.svg";
import { ReactComponent as LightDark } from "./images/light-dark.svg";
import { ReactComponent as GWSlogo } from "./images/gws-logo.svg";
import { InstallPWAPrompt } from "./componenets/InstallPWAPropt.js";
import CodemirrorInput from "./componenets/UI/CodemirrorInput";
import { InputSelect } from "./componenets/UI/Inputs/Selectable/Primitives";

function App() {
    const ThemeMode = usePrefersColorScheme();
    const [selectedMode, setSelectedMode] = useState("html");
    const [codeTypes, setCodeTypes] = useState([
        {
            label: "HTML",
            value: "html",
            selected: true
        },
        {
            label: "SVG (No HTML)",
            value: "svg",
            selected: false
        },
        {
            label: "JS",
            value: "js",
            selected: false
        }
    ]);
    const selectedOption = codeTypes.filter((option) => option.selected === true)[0];
    const [preferredTheme, setPreferredTheme] = useState("none");
    const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
    const [codeBlock, setCodeBlock] = useState("");
    const [consoleLogOutput, setConsoleLogOutput] = useState("");

    const themeModeReverse = ThemeMode === "dark" ? "light" : "dark";
    const prefThemeReverse = preferredTheme !== "none" ? (preferredTheme === "dark" ? "light" : "dark") : "none";
    const currentReverseThemeMode = prefThemeReverse === "none" ? themeModeReverse : prefThemeReverse;
    const currentThemeMode = prefThemeReverse === "none" ? ThemeMode : preferredTheme;
    const outputRef = useRef(null);

    useEffect(() => {
        fetch(fileContents)
            .then((response) => response.text())
            .then((text) => {
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

    const onButtonRunHandler = () => {
        // Get the input code from the text area
        const inputCode = codeBlock;

        // Override the console.log function to capture log messages
        const consoleOutput = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            originalConsoleLog(...args);
            consoleOutput.push(args.join(" "));
        };

        // Create a new script element and set its innerHTML to the input code
        const script = document.createElement("script");
        script.innerHTML = inputCode;

        // Evaluate the script and store the output
        let output;
        try {
            document.body.appendChild(script);
            output = consoleOutput.join("\n");
        } catch (err) {
            consoleLogOutput = err.toString();
            output = err.toString();
        } finally {
            document.body.removeChild(script);
            console.log = originalConsoleLog;
        }

        // Update the console output
        setConsoleLogOutput(output);
    };

    const onButtonDarkModeHandler = () => {
        switch (preferredTheme) {
            case "light":
                setPreferredTheme("dark");
                document.querySelector("body").setAttribute("pref-color", "dark");
                break;

            case "dark":
                setPreferredTheme("light");
                document.querySelector("body").setAttribute("pref-color", "light");
                break;

            default:
                setPreferredTheme(themeModeReverse);
                document.querySelector("body").setAttribute("pref-color", themeModeReverse);
                break;
        }
    };

    const onSelectUpdateHandler = (newCodeTypes) => {
        const newSelectedOption = newCodeTypes.filter((option) => option.selected === true)[0];

        if (newSelectedOption.value === "js") {
            setCodeBlock('console.log("Hello World!")');
        }

        setCodeTypes(newCodeTypes);
        setSelectedMode(newSelectedOption.value);
    };

    return (
        <div className="gws-live-preview">
            <div className="grid gap-20">
                <header className="gws-live-preview__header header grid-24 flex justify-space-between align-stretch">
                    <div className="header__gws-logo">
                        <a href="https://griffin-web.studio" target="_blank" rel="noopener noreferrer">
                            <GWSlogo />
                        </a>
                        <AppLogo style={{ paddingLeft: "0.5em" }} />
                    </div>

                    <div className={`grid gap-20 ${selectedMode === "js" ? "col-7" : "col-6"}`}>
                        <div className="header__code-selector grid-4 flex align-stretch justify-stretch">
                            <InputSelect options={codeTypes} className="wide" onSelect={onSelectUpdateHandler} />
                        </div>

                        <div className="header__preferred-color grid-1 flex align-center">
                            <button className={`button${currentReverseThemeMode === "light" ? " button__secondary button__secondary--radius" : " button--radius button--dark"}`} onClick={onButtonDarkModeHandler}>
                                <LightDark className={`header__preferred-color-svg header__preferred-color-svg--${currentReverseThemeMode}`} />
                            </button>
                        </div>

                        <div className="header__reset-code grid-1 flex align-center">
                            <button className="button button--radius" onClick={onButtonResetHandler}>
                                <i className="icon-reset-bold" />
                            </button>
                        </div>

                        {selectedMode === "js" && (
                            <div className="header__reset-code grid-1 flex align-center">
                                <button className="button button--radius" onClick={onButtonRunHandler}>
                                    🏃‍♂️
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="gws-live-preview__body body grid-24 grid gap-20">
                    <div className="grid-24 grid-lt-12">
                        <div className="gws-live-preview__code-block">
                            <CodemirrorInput onInputChange={onCodemirrorInputChangeHandler} value={codeBlock} themeColor={currentThemeMode} />
                        </div>
                    </div>

                    <div className="grid-24 grid-lt-12">
                        {selectedMode === "svg" && <div className="gws-live-preview__code-preview flex align-center justify-center" dangerouslySetInnerHTML={{ __html: codeBlock }} />}
                        {selectedMode === "html" && <iframe srcDoc={codeBlock} className="gws-live-preview__code-preview flex align-center justify-center" title="Preview Frame" />}
                        {selectedMode === "js" && (
                            <div
                                ref={outputRef}
                                className="gws-live-preview__code-preview"
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    fontFamily: "monospace",
                                    padding: "10px",
                                    height: "200px",
                                    overflow: "scroll",
                                    marginBottom: "20px",
                                    whiteSpace: "pre-wrap"
                                }}>
                                {consoleLogOutput}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <InstallPWAPrompt />
        </div>
    );
}

export default App;
