/**
 * Websocket events, used by both the client and the server.
 * Subject to change
 */

interface Message {
  topic: string;
  data?: any;
}

export interface JoinMessage extends Message {
  topic: 'JOIN';
  data: {
    userName: string;
  };
}

export interface CodeMessage extends Message {
  topic: 'CODE';
  data: {
    css: string;
    html: string;
  };
}

export interface CreateMessage extends Message {
  topic: 'CREATE',
}

export type WebSocketMessage = JoinMessage | CodeMessage;


