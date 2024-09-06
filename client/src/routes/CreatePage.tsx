import { useEffect } from 'react';

import { socket } from '@/utils/socket';

export const CreatePage = () => {
  const handleClick = () => {
    socket.createGame();
  };

  useEffect(() => {
    const onCreate = () => {
      console.log('CREATE 🟢');
    };

    socket.addEventListener('CREATE', onCreate);

    return () => {
      socket.removeEventListener('CREATE', onCreate);
    };
  }, []);

  return (
    <div className="text-white">
      <button
        onClick={handleClick}
        className="to rounded-md bg-orange-600 bg-gradient-to-br from-red-600 p-2"
      >
        Create game
      </button>
    </div>
  );
};
