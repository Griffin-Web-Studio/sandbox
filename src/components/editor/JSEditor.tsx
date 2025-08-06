import React from "react";
import Editor from "../ui/Editor";
import EditorContext from "@/context/EditorContext";

// interface JSEditorProps

const JSEditor: React.FC = () => {
  const editorContext = React.useContext(EditorContext);
  const editorStore = editorContext?.editorStore;
  const setEditorStore = editorContext?.setEditorStore;
  const preferredDark = editorStore?.preferredDark ?? false;
  const consoleRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const sandboxRef = React.useRef<HTMLIFrameElement>(null);
  const commandHistory = React.useRef<string[]>([]);
  const historyIndex = React.useRef<number>(-1);

  const onEditorChangeHandler = React.useCallback(
    (value: string) => {
      if (!setEditorStore) return;
      localStorage.setItem("js_code", value);
      setEditorStore((old) => ({
        ...old,
        codeStore: { ...old.codeStore, js: value },
      }));
    },
    [setEditorStore]
  );

  const executeCode = (code: string) => {
    const sandboxWindow = sandboxRef.current?.contentWindow as Window & {
      console: {
        log: (...args: unknown[]) => void;
        warn: (...args: unknown[]) => void;
        error: (...args: unknown[]) => void;
      };
      eval: (code: string) => unknown;
    };

    if (!sandboxWindow) return;

    // Override console methods to capture output
    sandboxWindow.console.log = (...args: unknown[]) => {
      if (consoleRef.current) {
        consoleRef.current.innerHTML += `<span style="color: black;">${args.join(
          " "
        )}</span><br>`;
      }
    };

    sandboxWindow.console.warn = (...args: unknown[]) => {
      if (consoleRef.current) {
        consoleRef.current.innerHTML += `<span style="color: orange;">Warning: ${args.join(
          " "
        )}</span><br>`;
      }
    };

    sandboxWindow.console.error = (...args: unknown[]) => {
      if (consoleRef.current) {
        consoleRef.current.innerHTML += `<span style="color: red;">Error: ${args.join(
          " "
        )}</span><br>`;
      }
    };

    // Execute the code in the sandbox
    try {
      sandboxWindow.eval(code);
    } catch (error) {
      if (consoleRef.current) {
        const errorMessage = (error as Error).message;
        consoleRef.current.innerHTML += `<span style="color: red;">Error: ${errorMessage}</span><br>`;
      }
    }
  };

  const handleRunCode = React.useCallback(() => {
    const code = editorStore?.codeStore.js || "";
    commandHistory.current.push(code);
    historyIndex.current = commandHistory.current.length;
    executeCode(code);
  }, [editorStore?.codeStore.js]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputRef.current) {
      const command = inputRef.current.value;
      commandHistory.current.push(command);
      historyIndex.current = commandHistory.current.length;
      executeCode(command);
      inputRef.current.value = "";
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      if (historyIndex.current > 0) {
        historyIndex.current--;
        if (inputRef.current) {
          inputRef.current.value = commandHistory.current[historyIndex.current];
        }
      }
    } else if (event.key === "ArrowDown") {
      if (historyIndex.current < commandHistory.current.length - 1) {
        historyIndex.current++;
        if (inputRef.current) {
          inputRef.current.value = commandHistory.current[historyIndex.current];
        }
      } else {
        historyIndex.current = commandHistory.current.length;
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    }
  };

  React.useEffect(() => {
    const runButton = document.getElementById("run");
    if (runButton) {
      runButton.addEventListener("click", handleRunCode);
    }

    return () => {
      if (runButton) {
        runButton.removeEventListener("click", handleRunCode);
      }
    };
  }, [handleRunCode]);

  return (
    <>
      <div className="grid-24 grid-lt-12">
        <div className="gws-live-preview__code-block">
          <Editor
            onChange={onEditorChangeHandler}
            value={editorStore?.codeStore.js}
            preferredDark={preferredDark}
            language="js"
          />
        </div>
      </div>

      <div className="grid-24 grid-lt-12">
        <button id="run">Run Code</button>
        <div
          ref={consoleRef}
          id="console"
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "200px",
            overflowY: "auto",
            background: "#f9f9f9",
            whiteSpace: "pre-wrap",
          }}
        />
        <input
          type="text"
          ref={inputRef}
          id="input"
          placeholder="Type additional commands here..."
          onKeyPress={handleInputKeyPress}
          onKeyDown={handleInputKeyDown}
          style={{ width: "100%", padding: "5px" }}
        />
        <iframe ref={sandboxRef} style={{ display: "none" }} />
      </div>
    </>
  );
};

export default JSEditor;
