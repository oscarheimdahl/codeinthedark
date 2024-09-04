import { useEffect, useRef, useState } from 'react';

export const CtrlSToast = () => {
  const [show, setShow] = useState(false);
  const timerRef = useRef<number>();

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
      className={`${show ? '' : 'translate-x-[calc(100%+1rem)]'}
        fixed bottom-4 right-4 p-4 pl-5 bg-darcula rounded-md shadow-lg overflow-hidden transition-transform`}
    >
      <div className='absolute left-0 top-0 h-full w-1 bg-orange-600'></div>
      <span className='text-xl text-white'>No need to save 😊</span>
    </div>
  );
};
