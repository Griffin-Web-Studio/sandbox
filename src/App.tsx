import React from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";

// Images
import LightDark from "@/assets/light-dark.svg?react";
import GwsLogo from "@/assets/logo-garage.svg?react";
import logo from "@/assets/logo.svg";
import Editor from "./components/ui/Editor";
import { Selector } from "./components/ui/Selector";

enum editorMode {
  HTML = "html",
  SVG = "svg",
  JS = "js",
}

function App() {
  const preferredColourScheme = usePrefersColorScheme();
  const darkTheme = preferredColourScheme === "dark";
  const [preferredDark, setPreferredDark] = React.useState<boolean>(
    localStorage.getItem("preferredDark") === "true"
  );
  const [previewLoaded, setPreviewLoaded] = React.useState<boolean>(false);
  const [codeBlock, setCodeBlock] = React.useState<string>("");
  const [selectedMode, setSelectedMode] = React.useState<editorMode>(
    editorMode.HTML
  );
  // TODO: Move this inside the context provider
  const [codeTypes, setCodeTypes] = React.useState([
    {
      label: "HTML",
      value: editorMode.HTML,
      selected: true,
    },
    {
      label: "SVG (No HTML)",
      value: editorMode.SVG,
      selected: false,
    },
    {
      label: "JS",
      value: editorMode.JS,
      selected: false,
    },
  ]);

  React.useEffect(() => {
    fetch(logo)
      .then((response) => response.text())
      .then((text) => {
        setCodeBlock(text);
        setPreviewLoaded(true);
      });
  }, [setCodeBlock]);

  React.useEffect(() => {
    document.body?.setAttribute("pref-color", preferredDark ? "dark" : "light");
  }, [preferredDark]);

  const onEditorChangeHandler = (value: string) => {
    setCodeBlock(value);
  };

  const onButtonResetHandler = () => {
    setPreviewLoaded(false);
  };

  const onPreferredThemeHandler = () => {
    if (preferredDark) {
      setPreferredDark(false);
      localStorage.setItem("preferredDark", "false");
      document.body?.setAttribute("pref-color", "light");
      return;
    }

    setPreferredDark(true);
    localStorage.setItem("preferredDark", "true");
    document.body?.setAttribute("pref-color", "dark");
  };

  const onSelectUpdateHandler = (newCodeTypes) => {
    const selectedOption = newCodeTypes.filter(
      (option) => option.selected === true
    )[0];
    setCodeTypes(newCodeTypes);
    setSelectedMode(selectedOption.value);
  };

  return (
    <div className="gws-live-preview">
      <div className="grid gap-20">
        <header className="gws-live-preview__header header grid-24 flex justify-space-between align-stretch">
          <div className="header__gws-logo flex flow-row">
            <a
              href="https://griffin-web.studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GwsLogo style={{ height: "130%" }} />
            </a>
            <img src={logo} alt="App Logo" style={{ paddingLeft: "1em" }} />
          </div>

          <div className="grid col-6 gap-20">
            <div className="header__code-selector grid-4 flex align-stretch justify-stretch">
              <Selector
                options={codeTypes}
                className="wide"
                onSelect={onSelectUpdateHandler}
              />
            </div>

            <div className="header__preferred-color grid-1 flex align-center">
              <button
                className={`button button--radius ${
                  preferredDark && " button--dark"
                }`}
                onClick={onPreferredThemeHandler}
              >
                <LightDark
                  className={`header__preferred-color-svg header__preferred-color-svg--${
                    preferredDark ? "light" : "dark"
                  }`}
                />
              </button>
            </div>

            <div className="header__reset-code grid-1 flex align-center">
              <button
                className="button button--radius"
                onClick={onButtonResetHandler}
              >
                <i className="icon-reset-bold" />
              </button>
            </div>
          </div>
        </header>

        <div className="gws-live-preview__body body grid-24 grid gap-20">
          <div className="grid-24 grid-lt-12">
            <div className="gws-live-preview__code-block">
              <Editor
                onChange={onEditorChangeHandler}
                value={codeBlock}
                preferredDark={preferredDark}
              />
            </div>
          </div>

          <div className="grid-24 grid-lt-12">
            {selectedMode === "svg" && (
              <div
                className="gws-live-preview__code-preview flex align-center justify-center"
                dangerouslySetInnerHTML={{ __html: codeBlock }}
              />
            )}
            {selectedMode === "html" && (
              <iframe
                srcDoc={codeBlock}
                className="gws-live-preview__code-preview flex align-center justify-center"
                title="Preview Frame"
              />
            )}
          </div>
        </div>
      </div>

      {/* <InstallPWAPrompt /> */}
    </div>
  );
}

export default App;
