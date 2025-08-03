import { useState, useEffect } from "react";
import usePrefersColorScheme from "use-prefers-color-scheme";
import fileContents from "./images/logo.svg";

function App() {
  const ThemeMode = usePrefersColorScheme();
  const [selectedMode, setSelectedMode] = useState("html");
  const [codeTypes, setCodeTypes] = useState([
    {
      label: "HTML",
      value: "html",
      selected: true,
    },
    {
      label: "SVG (No HTML)",
      value: "svg",
      selected: false,
    },
    {
      label: "JS",
      value: "js",
      selected: false,
    },
  ]);
  const [preferredTheme, setPreferredTheme] = useState("none");
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const [codeBlock, setCodeBlock] = useState("");
  const themeModeReverse = ThemeMode === "dark" ? "light" : "dark";
  const prefThemeReverse =
    preferredTheme !== "none"
      ? preferredTheme === "dark"
        ? "light"
        : "dark"
      : "none";
  const currentReverseThemeMode =
    prefThemeReverse === "none" ? themeModeReverse : prefThemeReverse;
  const currentThemeMode =
    prefThemeReverse === "none" ? ThemeMode : preferredTheme;
  console.log("selectedMode", selectedMode);

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
        document
          .querySelector("body")
          .setAttribute("pref-color", themeModeReverse);
        break;
    }
  };

  const onSelectUpdateHandler = (newCodeTypes) => {
    const selectedOption = newCodeTypes.filter(
      (option) => option.selected === true
    )[0];
    setCodeTypes(newCodeTypes);
    setSelectedMode(selectedOption.value);
  };
}

export default App;
