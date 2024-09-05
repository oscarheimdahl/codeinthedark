import { useState } from 'react';
import { CodeWindow } from '@/components/CodeWindow';
import { CtrlSToast } from '@/components/CtrlSToast';
import { defaultCSS, defaultHTML } from '@/utils/defaultInput';
import { ConnectionStuff } from '@/components/ConnectionStuff';
import { Input } from '@/components/ui/Input';

const containerID = 'injected-div';

function App() {
  const [html, setHTML] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [userName, setUsername] = useState('');

  return (
    <>
      <div className='w-full h-full flex flex-col gap-2'>
        <div className='flex justify-between mx-1'>
          <Input
            placeholder='Display name...'
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          <ConnectionStuff />
        </div>
        <div className='flex gap-4 w-full '>
          <CodeWindow mode='html' code={html} setCode={setHTML} />
          <CodeWindow mode='css' code={css} setCode={setCSS} />
        </div>
        <div
          className=''
          id={containerID}
          dangerouslySetInnerHTML={{
            __html: buildHtmlCss(html, css),
          }}
        ></div>
      </div>
      <CtrlSToast />
    </>
  );
}

function buildHtmlCss(html: string, css: string) {
  if (!html) return '';
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
