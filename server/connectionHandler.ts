export interface ConnectionHandler {
  participants: Map<string, WebSocket>;
  host: WebSocket;
}

