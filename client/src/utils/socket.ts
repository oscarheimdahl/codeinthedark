import { ClientSocketTopic, type ClientSocketMessage } from '~/clientMessages';
import { ServerSocketTopic } from '~/serverMessages';

const SERVER_URL = 'localhost:8000';

const webSocket = new WebSocket(`ws://${SERVER_URL}/create`);
const eventListeners = new Map<ClientSocketTopic, (() => void)[]>();

webSocket.onmessage = (event) => {
  const message: ClientSocketMessage = JSON.parse(event.data);

  const listeners = eventListeners.get(message.topic);
  if (listeners) {
    listeners.forEach((listener) => listener());
  }
};

const addEventListener = (topic: ServerSocketTopic, callback: () => void) => {
  const previousListeners = eventListeners.get(topic) ?? [];
  previousListeners.push(callback);
  eventListeners.set(topic, previousListeners);
};

const removeEventListener = (
  topic: ClientSocketTopic,
  callback: () => void,
) => {
  const previousListeners = eventListeners.get(topic) ?? [];
  const newListeners = previousListeners.filter(
    (listener) => listener !== callback,
  );
  eventListeners.set(topic, newListeners);
};

const createGame = () => {
  sendWebSocketMessage({ topic: 'CREATE' });
};

const sendWebSocketMessage = (message: ClientSocketMessage) => {
  webSocket.send(JSON.stringify(message));
};

export const socket = {
  addEventListener,
  removeEventListener,
  createGame,
};
