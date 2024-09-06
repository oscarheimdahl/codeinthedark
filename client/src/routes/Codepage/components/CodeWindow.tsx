import { html as htmlMode } from '@codemirror/lang-html';
import { less as cssMode } from '@codemirror/lang-less';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';

import { cn } from '@/utils/cn';

interface CodeWindowProps {
  mode: 'html' | 'css';
  code: string;
  setCode: (code: string) => void;
}

export const CodeWindow = ({ mode, code, setCode }: CodeWindowProps) => {
  const isHtml = mode === 'html';

  const hideTitle = code.length > 4;

  return (
    <div className="relative flex h-full w-full max-w-full flex-col overflow-y-hidden overflow-x-scroll rounded-md">
      <CodeMirror
        height="70vh"
        theme={dracula}
        extensions={[isHtml ? htmlMode() : cssMode()]}
        className="text-left text-xl"
        value={code}
        basicSetup={{
          lineNumbers: true,
        }}
        onChange={(newValue) => {
          setCode(newValue);
        }}
      />
      <span
        className={
          `${isHtml ? 'text-gradient-red' : 'text-gradient-blue'} ` + // cn/tw-merge removes custom classes
          cn(
            hideTitle ? 'opacity-0' : 'opacity-50',
            'pointer-events-none absolute bottom-0 right-2 h-min select-none text-9xl font-bold transition-opacity',
          )
        }
      >
        {isHtml ? 'HTML' : 'CSS'}
      </span>
    </div>
  );
};
