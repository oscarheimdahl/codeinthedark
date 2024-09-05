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
    <div className='flex flex-col h-full w-full relative'>
      <CodeMirror
        height='70vh'
        theme={dracula}
        extensions={[isHtml ? htmlMode() : cssMode()]}
        className='text-left shadow-lg text-xl rounded-md overflow-hidden'
        value={code}
        basicSetup={{
          lineNumbers: true,
        }}
        onChange={(newValue) => {
          setCode(newValue);
        }}
      />
      <span
        className={`
          ${hideTitle ? 'opacity-0' : 'opacity-50'} 
          ${isHtml ? 'text-gradient-red' : 'text-gradient-blue'} 

        absolute h-min bottom-0 right-2 text-white/5 select-none pointer-events-none font-bold text-9xl  transition-opacity`}
      >
        {isHtml ? 'HTML' : 'CSS'}
      </span>
    </div>
  );
};
