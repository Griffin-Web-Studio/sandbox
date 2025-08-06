import React from "react";
import { CodeSampleGenerator } from "@/utils/sample";

// Images
import LightDark from "@/assets/light-dark.svg?react";
import GwsLogo from "@/assets/logo-garage.svg?react";
import Logo from "@/assets/logo.svg?react";

// Context
import EditorContext from "@/context/EditorContext";
import type { languageOption } from "@/context/EditorProvider";

// components
import { Selector, type option } from "../ui/Selector";

// export interface HeaderProps {}

const Header: React.FC = () => {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const setEditorStore = editorContext?.setEditorStore;
  const codeTypes = editorStore?.codeSelection;
  const preferredDark = editorStore?.preferredDark;
  const selectedLanguage = editorStore?.selectedLanguage;

  const onButtonResetHandler = () => {
    (async () => {
      if (!setEditorStore || !selectedLanguage) return;
      const codeSampleGenerator = new CodeSampleGenerator(selectedLanguage);
      const value = await codeSampleGenerator.generateSample();

      localStorage.setItem(`${selectedLanguage}_code`, value);
      setEditorStore((old) => ({
        ...old,
        codeStore: { ...old.codeStore, [selectedLanguage]: value },
      }));
    })();
  };

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
    const codeSelection = options as languageOption[];

    if (!setEditorStore) return;

    const selectedOption = codeSelection.filter(
      (option) => option.selected === true
    )[0];

    setEditorStore((old) => ({
      ...old,
      codeSelection,
      selectedLanguage: selectedOption.value,
    }));
  };

  return (
    <header className="gws-live-preview__header header grid-24 flex justify-space-between align-stretch">
      <div className="header__gws-logo flex flow-row">
        <a
          href="https://griffin-web.studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GwsLogo style={{ height: "145%" }} />
        </a>
        <Logo style={{ height: "100%", width: "100%", paddingLeft: "1em" }} />
      </div>

      <div className="grid col-6 gap-20">
        <div className="header__code-selector grid-4 flex align-center justify-stretch">
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
  );
};

export default Header;
