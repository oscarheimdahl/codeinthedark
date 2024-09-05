import { useState } from 'react';
import { CodeWindow } from '@/components/CodeWindow';
import { CtrlSToast } from '@/components/CtrlSToast';
import { defaultCSS, defaultHTML } from '@/utils/defaultInput';
import { ConnectionStuff } from '@/components/ConnectionStuff';
import { Input } from '@/components/ui/Input';
import { ResultView } from './components/ResultView';

function App() {
  const [html, setHTML] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [userName, setUsername] = useState('');

  return (
    <>
      <div className='w-full h-full flex flex-col gap-4'>
        <div className='flex justify-between mx-1'>
          <Input
            placeholder='Display name...'
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <ConnectionStuff />
        </div>
        <div className='flex gap-4 w-full '>
          <CodeWindow mode='html' code={html} setCode={setHTML} />
          <CodeWindow mode='css' code={css} setCode={setCSS} />
        </div>
        <ResultView html={html} css={css} />
      </div>
      <CtrlSToast />
    </>
  );
}

export default App;
