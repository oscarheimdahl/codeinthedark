import { useState } from 'react';

import { CodeWindow } from '@/components/CodeWindow';
import { ConnectionStuff } from '@/components/ConnectionStuff';
import { CtrlSToast } from '@/components/CtrlSToast';
import { ResultView } from '@/components/ResultView';
import { Input } from '@/components/ui/Input';
import { defaultCSS, defaultHTML } from '@/utils/defaultInput';

function App() {
  const [html, setHTML] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [userName, setUsername] = useState('');

  return (
    <>
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4">
        <div className="flex justify-between">
          <Input
            placeholder="Display name..."
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <ConnectionStuff />
        </div>
        <div className="flex w-full gap-4 lg:text-xl">
          <CodeWindow mode="html" code={html} setCode={setHTML} />
          <CodeWindow mode="css" code={css} setCode={setCSS} />
        </div>
        <ResultView html={html} css={css} />
      </div>
      <CtrlSToast />
    </>
  );
}

export default App;
