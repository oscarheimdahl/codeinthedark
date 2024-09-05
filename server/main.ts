import {
  type CodeMessage,
  type JoinMessage,
  type WebSocketMessage,
} from "./../common/messageTypes.ts";
import { GameHandler } from "./server.ts";

const gameHandler = new GameHandler();

// TODO: For every connection, need to store so we can broadcast data to them
const activeConnections = new Map<string, WebSocket>();

Deno.serve((req: Request) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("open", () => {
    console.log("a client connected");
  });

  socket.addEventListener("message", (msg: WebSocketMessage) => {
    // TODO: Create interfaces for creating game, joining game, etc
    if (msg.topic === "CREATE") {
      const gameId = gameHandler.createGame();
      socket.send(JSON.stringify({ gameId }));
    }
  });

  return response;
});

