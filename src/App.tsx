import React from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";

// Images
import Logo from "@/assets/logo.svg?react";
import LightDark from "@/assets/light-dark.svg?react";
import GwsLogo from "@/assets/logo-garage.svg?react";
import logo from "@/assets/logo.svg";

function App() {
  const preferredColourScheme = usePrefersColorScheme();
  const darkTheme = preferredColourScheme === "dark";
  const [preferredDark, setPreferredDark] = React.useState<boolean>(
    localStorage.getItem("preferredDark") === "true"
  );
  const [previewLoaded, setPreviewLoaded] = React.useState<boolean>(false);
  const [codeBlock, setCodeBlock] = React.useState<string>("");

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
  return (
    <div className="gws-live-preview">
      <div className="grid gap-20">
        <header className="gws-live-preview__header header grid-24 flex justify-space-between align-stretch">
          <div className="header__gws-logo">
            <a
              href="https://griffin-web.studio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GwsLogo />
            </a>
            <Logo style={{ paddingLeft: "0.5em" }} />
          </div>

          <div className="grid col-6 gap-20">
            <div className="header__code-selector grid-4 flex align-stretch justify-stretch">
              {/* <InputSelect
                options={codeTypes}
                className="wide"
                onSelect={onSelectUpdateHandler}
              /> */}
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
                // onClick={onButtonResetHandler}
              >
                <i className="icon-reset-bold" />
              </button>
            </div>
          </div>
        </header>

        <div className="gws-live-preview__body body grid-24 grid gap-20">
          <div className="grid-24 grid-lt-12">
            <div className="gws-live-preview__code-block">
              {/* <CodemirrorInput
                onInputChange={onCodemirrorInputChangeHandler}
                value={codeBlock}
                themeColor={currentThemeMode}
              /> */}
            </div>
          </div>

          <div className="grid-24 grid-lt-12">
            {/* {selectedMode === "svg" && (
              <div
                className="gws-live-preview__code-preview flex align-center justify-center"
                dangerouslySetInnerHTML={{ __html: codeBlock }}
              />
            )}
            {selectedMode === "html" && ( */}
            <iframe
              srcDoc={codeBlock}
              className="gws-live-preview__code-preview flex align-center justify-center"
              title="Preview Frame"
            />
            {/*)} */}
          </div>
        </div>
      </div>

      {/* <InstallPWAPrompt /> */}
    </div>
  );
}

export default App;
