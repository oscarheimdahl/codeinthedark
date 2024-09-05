import { useEffect, useRef, useState } from 'react';

import { Smile } from 'lucide-react';

export const CtrlSToast = () => {
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleCtrlS = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        clearTimeout(timerRef.current);
        setShow(true);
        timerRef.current = setTimeout(() => setShow(false), 1500);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleCtrlS);
    return () => {
      document.removeEventListener('keydown', handleCtrlS);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`${show ? '' : 'translate-x-[calc(100%+1rem)]'} fixed bottom-4 right-4 overflow-hidden rounded-md bg-darcula p-4 pl-5 shadow-lg transition-transform`}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-orange-600"></div>
      <span className="flex items-center gap-2 text-xl text-white">
        No need to save <Smile className="fill-amber-400 text-black" />
      </span>
    </div>
  );
};
