import { useEffect, useRef, useState } from 'react';

import {
  CircleAlert as Alert,
  Meh,
  Save as SaveIcon,
  Skull,
  SkullIcon,
  Sticker,
} from 'lucide-react';

type Save = { id: string; x: number; color: string; num: number };

export const CtrlSToast = () => {
  const [saves, setSaves] = useState<Save[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const numSavesRef = useRef(0);

  const removeSave = (id: string) => {
    setSaves((prev) => prev.filter((save) => save.id !== id));
  };

  useEffect(() => {
    const handleCtrlS = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        clearTimeout(timerRef.current);
        const id = Math.random().toString();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setSaves((prev) => [
          ...prev,
          {
            id,
            x: Math.random() * window.innerWidth,
            color: randomColor,
            num: numSavesRef.current++,
          },
        ]);
        setTimeout(() => removeSave(id), 1500);
      }
    };
    document.addEventListener('keydown', handleCtrlS);
    return () => {
      document.removeEventListener('keydown', handleCtrlS);
      clearTimeout(timerRef.current);
    };
  }, []);

  const icon = (num: number) => {
    const style = { gridArea: '1 / 1' };
    if (num < 20) return <SaveIcon style={style} className="size-6"></SaveIcon>;
    if (num < 40) return <Sticker style={style} className="size-6"></Sticker>;
    if (num < 60) return <Alert style={style} className="size-6"></Alert>;
    if (num < 80) return <Meh style={style} className="size-6"></Meh>;
    return <SkullIcon style={style} className="size-6"></SkullIcon>;
  };

  return saves.map((save) => (
    <div
      key={save.id}
      style={{
        left: `${save.x}px`,
        color: save.color,
      }}
      className="ce bounce absolute -bottom-8 left-0 grid items-center"
    >
      <div
        style={{ boxShadow: `0 4px 15px ${save.color}`, gridArea: '1 / 1' }}
        className="mx-auto size-4 opacity-50"
      ></div>
      {icon(save.num)}
    </div>
  ));
};

const colors = [
  '#f43f5e',
  '#ec4899',
  '#d946ef',
  '#a855f7',
  '#8b5cf6',
  '#6366f1',
  '#3b82f6',
  '#06b6d4',
  '#14b8a6',
  '#10b981',
  '#22c55e',
  '#84cc16',
  '#f59e0b',
  '#f97316',
  '#ef4444',
];
