import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import { CircleCheck, CircleX, Loader, PlugZap, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

export const ConnectionStuff = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );
  const disabled = input.length < 6;

  const handleInput = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    setInput(numbers);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState('loading');
    setTimeout(() => {
      setState(Math.random() > 0.5 ? 'success' : 'error');
    }, 1000);
  };

  const icon = (state: 'idle' | 'loading' | 'success' | 'error') => {
    if (state === 'idle') return <PlugZap />;
    if (state === 'loading') return <Loader className='animate-spin' />;
    if (state === 'success') return <CircleCheck />;
    if (state === 'error') return <CircleX className='text-red-500' />;
    return <X />;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-1 items-center relative w-min group'>
        <Input
          maxLength={7}
          value={
            input.length > 3 ? input.slice(0, 3) + '-' + input.slice(3) : input
          }
          onChange={(e) => handleInput(e.target.value)}
          placeholder='000-000'
          className='w-[125px]'
        />
        <button
          disabled={disabled}
          type='submit'
          className={cn(
            'absolute p-1 items-center gap-1 right-1 text-[#9CA3AF]',
            'disabled:cursor-not-allowed'
          )}
        >
          {icon(state)}
        </button>
      </div>
    </form>
  );
};
