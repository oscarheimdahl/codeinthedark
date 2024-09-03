import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { less } from "@codemirror/lang-less";
import { html as htmlMode } from "@codemirror/lang-html";

const containerID = "injected-div";

function App() {
  const [css, setCSS] = useState("");
  const [html, setHTML] = useState("");

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col h-full w-full">
          <h2>HTML</h2>
          <CodeMirror
            minWidth={"100%"}
            minHeight={"100%"}
            theme={okaidia}
            extensions={[htmlMode()]}
            className="text-black h-full text-left flex-grow"
            value={html}
            onChange={(newValue) => {
              setHTML(newValue);
            }}
          />
        </div>
        <div className="flex flex-col h-full w-full">
          <h2>CSS</h2>
          <CodeMirror
            minWidth={"100%"}
            minHeight={"100%"}
            theme={okaidia}
            extensions={[less()]}
            className="text-black h-full text-left flex-grow"
            value={css}
            onChange={(newValue) => {
              setCSS(newValue);
            }}
          />
        </div>
      </div>
      <div
        className="ring"
        id={containerID}
        dangerouslySetInnerHTML={{
          __html: `
        <style>
        #${containerID} {
          ${css}
        }
        </style>
        ${html}
        `,
        }}
      ></div>
    </div>
  );
}

export default App;
