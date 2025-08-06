import React from "react";
import { getHtmlSample, getJsSample, getSvgSample } from "./utils/sample";

// Images
import LightDark from "@/assets/light-dark.svg?react";
import GwsLogo from "@/assets/logo-garage.svg?react";
import Logo from "@/assets/logo.svg?react";

// Components
import { type supportedLanguages } from "./components/ui/Editor";
import { Selector, type option } from "./components/ui/Selector";

// Contexts
import EditorContext, { type editorStoreValues } from "./context/EditorContext";
import type { languageOption } from "./context/EditorProvider";
import JSEditor from "./components/editor/JSEditor";
import XMLEditor from "./components/editor/XMLEditor";
import HTMLEditor from "./components/editor/HTMLEditor";

function App() {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const setEditorStore = editorContext?.setEditorStore;
  const preferredDark = editorStore?.preferredDark;
  const [selectedMode, setSelectedMode] =
    React.useState<supportedLanguages>("html");
  // TODO: Move this inside the context provider
  const [codeTypes, setCodeTypes] = React.useState<
    editorStoreValues["codeSelection"] | undefined
  >(editorStore?.codeSelection);

  const onButtonResetHandler = React.useCallback(() => {
    (async () => {
      if (!setEditorStore) return;
      if ("html" === selectedMode) {
        const value = await getHtmlSample();
        localStorage.setItem("html_code", value);
        setEditorStore((old) => ({
          ...old,
          codeStore: { ...old.codeStore, html: value },
        }));
      } else if ("xml" === selectedMode) {
        const value = await getSvgSample();
        localStorage.setItem("xml_code", value);
        setEditorStore((old) => ({
          ...old,
          codeStore: { ...old.codeStore, xml: value },
        }));
      } else if ("js" === selectedMode) {
        const value = await getJsSample();
        localStorage.setItem("js_code", value);
        setEditorStore((old) => ({
          ...old,
          codeStore: { ...old.codeStore, js: value },
        }));
      }
    })();
  }, [selectedMode, setEditorStore]);

  const onPreferredThemeHandler = () => {
    if (!setEditorStore) return;
    if (preferredDark) {
      setEditorStore((old) => ({ ...old, preferredDark: false }));
      localStorage.setItem("preferredDark", "false");
      document.body?.setAttribute("pref-color", "light");
      return;
    }

    setEditorStore((old) => ({ ...old, preferredDark: true }));
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
          {selectedMode === "html" && (
            <HTMLEditor preferredDark={preferredDark} />
          )}
          {selectedMode === "xml" && (
            <XMLEditor preferredDark={preferredDark} />
          )}
          {selectedMode === "js" && <JSEditor preferredDark={preferredDark} />}
        </div>
      </div>

      {/* <InstallPWAPrompt /> */}
    </div>
  );
}

export default App;
