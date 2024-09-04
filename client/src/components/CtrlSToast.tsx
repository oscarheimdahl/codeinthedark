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
      <span className='text-xl text-white flex gap-2 items-center'>
        No need to save <SmileIcon className='fill-amber-400 text-black' />
      </span>
    </div>
  );
};

const SmileIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx={12} cy={12} r={10} />
      <path d='M8 14s1.5 2 4 2 4-2 4-2' />
      <line x1={9} x2={9.01} y1={9} y2={9} />
      <line x1={15} x2={15.01} y1={9} y2={9} />
    </svg>
  );
};
