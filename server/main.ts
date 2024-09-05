import { Participant } from "../common/game.ts";
import {
  type CodeMessage,
  type JoinMessage,
  type WebSocketMessage,
} from "./../common/messageTypes.ts";
import { ConnectionHandler } from "./connectionHandler.ts";
import { GameHandler } from "./gameHandler.ts";

const gameHandler = new GameHandler();

// TODO: For every connection, need to store so we can broadcast data to them
const activeConnections = new Map<string, ConnectionHandler>();

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
      const newConnection: ConnectionHandler = {
        host: socket,
        participants: new Map(),
      };
      activeConnections.set(gameId, newConnection);
      socket.send(JSON.stringify({ gameId }));
    }

    if (msg.topic === "JOIN") {
      const joinedPlayer = gameHandler.joinGame(
        msg.data.gameId, // TODO: Append game id to message
        msg.data.userName,
      );

      const gameConnection = activeConnections.get(msg.data.gameId);
      gameConnection?.participants.set(joinedPlayer, socket);
      socket.send(JSON.stringify({ message: "Okeeeeeeey lets go" }));
    }

    if (msg.topic === "CODE") {
      // TODO: append game id, participant id to message
      const { html, css, gameId, participantId } = msg.data;
      gameHandler.editCode(gameId, participantId, html, css);
      activeConnections.get(gameId)?.host.send(JSON.stringify({
        participants: gameHandler.getGameOrReturnError(gameId).participant,
      }));
    }
  });

  return response;
});

