import { useState } from 'react';

import { CodeWindow } from '@/components/CodeWindow';
import { ConnectionStuff } from '@/components/ConnectionStuff';
import { CtrlSToast } from '@/components/CtrlSToast';
import { ResultView } from '@/components/ResultView';
import { Input } from '@/components/ui/Input';
import { defaultCSS, defaultHTML } from '@/utils/defaultInput';

import { type JoinMessage } from '~/messageTypes';

function App() {
  const [html, setHTML] = useState(defaultHTML);
  const [css, setCSS] = useState(defaultCSS);
  const [userName, setUsername] = useState('');

  const a: JoinMessage = {};

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4">
        <div className="mx-1 flex justify-between">
          <Input
            placeholder="Display name..."
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <ConnectionStuff />
        </div>
        <div className="flex w-full gap-4">
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
