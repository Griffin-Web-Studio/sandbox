import React from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";
import { getHtmlSample, getJsSample, getSvgSample } from "./utils/sample";

// Images
import LightDark from "@/assets/light-dark.svg?react";
import GwsLogo from "@/assets/logo-garage.svg?react";
import Logo from "@/assets/logo.svg?react";

// Components
import Editor, { type supportedLanguages } from "./components/ui/Editor";
import { Selector, type option } from "./components/ui/Selector";

// Contexts
import EditorContext, { type editorStoreValues } from "./context/EditorContext";
import type { languageOption } from "./context/EditorProvider";

function App() {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const setEditorStore = editorContext?.setEditorStore;
  const preferredColourScheme = usePrefersColorScheme();
  const darkTheme = preferredColourScheme === "dark";
  const [preferredDark, setPreferredDark] = React.useState<boolean>(darkTheme);
  const [selectedMode, setSelectedMode] =
    React.useState<supportedLanguages>("html");
  // TODO: Move this inside the context provider
  const [codeTypes, setCodeTypes] = React.useState<
    editorStoreValues["codeSelection"] | undefined
  >(editorStore?.codeSelection);

  const onEditorChangeHandler = React.useCallback(
    (value: string) => {
      if (!setEditorStore) return;
      if ("html" === selectedMode) {
        localStorage.setItem("html_code", value);
        setEditorStore((old) => ({
          ...old,
          codeStore: { ...old.codeStore, html: value },
        }));
      } else if ("xml" === selectedMode) {
        localStorage.setItem("svg_code", value);
        setEditorStore((old) => ({
          ...old,
          codeStore: { ...old.codeStore, svg: value },
        }));
      } else if ("js" === selectedMode) {
        localStorage.setItem("js_code", value);
        setEditorStore((old) => ({
          ...old,
          codeStore: { ...old.codeStore, js: value },
        }));
      }
    },
    [setEditorStore, selectedMode]
  );

  const onButtonResetHandler = React.useCallback(() => {
    (async () => {
      if ("html" === selectedMode) {
        onEditorChangeHandler(await getHtmlSample());
      } else if ("xml" === selectedMode) {
        onEditorChangeHandler(await getSvgSample());
      } else if ("js" === selectedMode) {
        onEditorChangeHandler(await getJsSample());
      }
    })();
  }, [selectedMode, onEditorChangeHandler]);

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

  const onSelectUpdateHandler = (options: option[]) => {
    const selectedOption = options.filter(
      (option) => option.selected === true
    )[0];
    setCodeTypes(options as languageOption[]);
    setSelectedMode(selectedOption.value as supportedLanguages);
  };

  React.useEffect(() => {
    document.body?.setAttribute("pref-color", preferredDark ? "dark" : "light");
  }, [preferredDark]);

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
            <Logo
              style={{ height: "100%", width: "100%", paddingLeft: "1em" }}
            />
          </div>

          <div className="grid col-6 gap-20">
            <div className="header__code-selector grid-4 flex align-stretch justify-stretch">
              {codeTypes && (
                <Selector
                  options={codeTypes}
                  className="wide"
                  onSelect={onSelectUpdateHandler}
                />
              )}
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
              {"html" === selectedMode && (
                <Editor
                  onChange={onEditorChangeHandler}
                  value={editorStore?.codeStore.html}
                  preferredDark={preferredDark}
                  language="html"
                />
              )}
              {"xml" === selectedMode && (
                <Editor
                  onChange={onEditorChangeHandler}
                  value={editorStore?.codeStore.svg}
                  preferredDark={preferredDark}
                  language="xml"
                />
              )}
              {"js" === selectedMode && (
                <Editor
                  onChange={onEditorChangeHandler}
                  value={editorStore?.codeStore.js}
                  preferredDark={preferredDark}
                  language="js"
                />
              )}
            </div>
          </div>

          <div className="grid-24 grid-lt-12">
            {selectedMode === "xml" && (
              <div
                className="gws-live-preview__code-preview flex align-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: localStorage.getItem("svg_code") ?? "",
                }}
              />
            )}
            {selectedMode === "html" && (
              <iframe
                srcDoc={localStorage.getItem("html_code") ?? ""}
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
