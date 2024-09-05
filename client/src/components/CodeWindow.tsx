import { html as htmlMode } from '@codemirror/lang-html';
import { less as cssMode } from '@codemirror/lang-less';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';

interface CodeWindowProps {
  mode: 'html' | 'css';
  code: string;
  setCode: (code: string) => void;
}

export const CodeWindow = ({ mode, code, setCode }: CodeWindowProps) => {
  const isHtml = mode === 'html';

  const hideTitle = code.length > 4;

  return (
    <div className="relative flex h-full w-full flex-col">
      <CodeMirror
        height="70vh"
        theme={dracula}
        extensions={[isHtml ? htmlMode() : cssMode()]}
        className="overflow-hidden rounded-md text-left text-xl shadow-lg"
        value={code}
        basicSetup={{
          lineNumbers: true,
        }}
        onChange={(newValue) => {
          setCode(newValue);
        }}
      />
      <span
        className={` ${hideTitle ? 'opacity-0' : 'opacity-50'} ${isHtml ? 'text-gradient-red' : 'text-gradient-blue'} pointer-events-none absolute bottom-0 right-2 h-min select-none text-9xl font-bold text-white/5 transition-opacity`}
      >
        {isHtml ? 'HTML' : 'CSS'}
      </span>
    </div>
  );
};
