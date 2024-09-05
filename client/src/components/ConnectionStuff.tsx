import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';
import { CircleCheck, Loader, PlugZap, X } from 'lucide-react';
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
      setState('success');
    }, 1000);
  };

  const icon = (state: 'idle' | 'loading' | 'success' | 'error') => {
    if (state === 'idle') return <PlugZap />;
    if (state === 'loading') return <Loader className='animate-spin ' />;
    if (state === 'success') return <CircleCheck />;
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
          className='w-[90px]'
        />
        <button
          disabled={disabled}
          type='submit'
          className={cn(
            'transition-opacity gap-1 text-white px-2 py-1 flex rounded-md shadow-sm bg-gray-500 disabled:text-gray-800 disabled:cursor-not-allowed disabled:shadow-none',
            disabled && 'text-gray-700',
            state === 'idle' &&
              !disabled &&
              'bg-blue-500 hover:bg-blue-600 active:bg-blue-700',
            state === 'success' && 'bg-green-600'
          )}
        >
          {icon(state)} Connect
        </button>
      </div>
    </form>
  );
};
