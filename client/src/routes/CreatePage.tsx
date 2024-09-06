import { useEffect } from 'react';

const SERVER_URL = 'localhost:8000';

export const CreatePage = () => {
  useEffect(() => {
    const connect = async () => {
      const ws = new WebSocket(`ws://${SERVER_URL}/create`);
      ws.onopen = () => {
        console.log('connected');
      };
      ws.onmessage = (event) => {
        console.log(event.data);
      };
      ws.onclose = () => {
        console.log('disconnected');
      };
    };
    connect();
  }, []);

  return <div className="text-white">CreatePage</div>;
};
