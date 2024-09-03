import { useEffect, useState } from "react";
import { CodeWindow } from "./components/CodeWindow";
import { defaultCSS, defaultHTML } from "./defaultInput";

const containerID = "injected-div";

function App() {
  const [html, setHTML] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const handleCtrlS = (e: KeyboardEvent) => {
      if (e.key === "s" && e.ctrlKey) {
        console.log("Don't need that");
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleCtrlS);
    return () => {
      document.removeEventListener("keydown", handleCtrlS);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-center w-full">
        <input
          placeholder="Displayname..."
          className="w-min text-3xl text-center bg-transparent border-none placeholder-[#262936]"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full ">
        <CodeWindow mode="html" code={html} setCode={setHTML} />
        <CodeWindow mode="css" code={css} setCode={setCSS} />
      </div>
      <div
        className="bg-white shadow-sm"
        id={containerID}
        dangerouslySetInnerHTML={{
          __html: buildHtmlCss(html, css),
        }}
      ></div>
    </div>
  );
}

function buildHtmlCss(html: string, css: string) {
  if (!html) return "";
  return `
        <style>
          #${containerID} {
            ${css}
          }
        </style>
        ${html}
  `;
}

export default App;
