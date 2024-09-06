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
  topic: 'CREATE';
}

// Client -> Server
export type ClientSocketMessage = JoinMessage | CodeMessage | CreateMessage;
export type ClientSocketTopic = ClientSocketMessage['topic'];
