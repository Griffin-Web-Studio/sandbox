import React from "react";

function App() {
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
              {/* <GWSlogo /> */}
            </a>
            {/* <AppLogo style={{paddingLeft: "0.5em"}} /> */}
          </div>

          <div className="grid col-6 gap-20">
            <div className="header__code-selector grid-4 flex align-stretch justify-stretch">
              {/* <InputSelect options={codeTypes} className="wide" onSelect={onSelectUpdateHandler} /> */}
            </div>

            <div className="header__preferred-color grid-1 flex align-center">
              {/* <button className={`button${currentReverseThemeMode === "light" ? " button__secondary button__secondary--radius" : " button--radius button--dark"}`} onClick={onButtonDarkModeHandler}>
                                <LightDark className={`header__preferred-color-svg header__preferred-color-svg--${currentReverseThemeMode}`} />
                            </button> */}
            </div>

            <div className="header__reset-code grid-1 flex align-center">
              {/* <button className="button button--radius" onClick={onButtonResetHandler}>
                                <i className="icon-reset-bold" />
                            </button> */}
            </div>
          </div>
        </header>

        <div className="gws-live-preview__body body grid-24 grid gap-20">
          <div className="grid-24 grid-lt-12">
            <div className="gws-live-preview__code-block">
              {/* <CodemirrorInput onInputChange={onCodemirrorInputChangeHandler} value={codeBlock} themeColor={currentThemeMode} /> */}
            </div>
          </div>

          <div className="grid-24 grid-lt-12">
            {/* {selectedMode === 'svg' && (<div className="gws-live-preview__code-preview flex align-center justify-center" dangerouslySetInnerHTML={{ __html: codeBlock }} />)}
                        {selectedMode === 'html' && (<iframe srcDoc={codeBlock} className="gws-live-preview__code-preview flex align-center justify-center" title="Preview Frame" />)} */}
          </div>
        </div>
      </div>

      {/* <InstallPWAPrompt /> */}
    </div>
  );
}

export default App;
