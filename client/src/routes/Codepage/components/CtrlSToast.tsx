import { useEffect, useRef, useState } from 'react';

import {
  CircleAlert as Alert,
  Meh,
  Save as SaveIcon,
  SkullIcon,
  Sticker,
} from 'lucide-react';

type Save = { id: string; x: number; color: string; num: number };

export const CtrlSToast = () => {
  const [saves, setSaves] = useState<Save[]>([]);
  const numSavesRef = useRef(0);

  const removeSave = (id: string) => {
    setSaves((prev) => prev.filter((save) => save.id !== id));
  };

  const addSave = (id: string, color: string, num: number) =>
    setSaves((prev) => [
      ...prev,
      {
        id,
        x: Math.random() * window.innerWidth,
        color,
        num,
      },
    ]);

  useEffect(() => {
    const handleCtrlS = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const id = Math.random().toString();
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const num = numSavesRef.current++;

        addSave(id, randomColor, num);
        setTimeout(() => removeSave(id), 1500);
      }
    };

    document.addEventListener('keydown', handleCtrlS);

    return () => {
      document.removeEventListener('keydown', handleCtrlS);
    };
  }, []);

  const icon = (num: number) => {
    const style = { gridArea: '1 / 1' };
    if (num < 20) return <SaveIcon style={style}></SaveIcon>;
    if (num < 40) return <Sticker style={style}></Sticker>;
    if (num < 60) return <Alert style={style}></Alert>;
    if (num < 80) return <Meh style={style}></Meh>;
    return <SkullIcon style={style}></SkullIcon>;
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
      <div className="size-6 [grid-area:1/1]">{icon(save.num)}</div>
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
