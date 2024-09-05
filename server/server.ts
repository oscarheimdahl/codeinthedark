import { Game, Participant, Progress } from "./../common/game.ts";

export class GameHandler {
  games: Map<string, Game>;
  constructor() {
    this.games = new Map();
  }

  createGame(): string {
    const uuid = crypto.randomUUID();
    const game: Game = {
      id: uuid,
      participant: [],
      progress: Progress.NOT_STARTED,
    };

    this.games.set(uuid, game);
    return uuid;
  }

  getGameOrReturnError(gameId: string): Game {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error("Game does not exist");
    }

    return game;
  }

  getPlayerOrReturnError(game: Game, participantId: string): Participant {
    const participant = game.participant.find((participant) =>
      participant.id === participantId
    );
    if (!participant) {
      throw new Error("Player does not exist");
    }

    return participant;
  }

  joinGame(gameId: string, displayName: string): string {
    const game: Game = this.getGameOrReturnError(gameId);

    const participantId = crypto.randomUUID();
    const participant: Participant = {
      displayName,
      id: participantId,
      cssCode: "",
      htmlCode: "",
    };
    game.participant.push(participant);

    return participantId;
  }

  editCode(
    gameId: string,
    participantId: string,
    htmlCode: string,
    cssCode: string,
  ) {
    const game: Game = this.getGameOrReturnError(gameId);
    const participant: Participant = this.getPlayerOrReturnError(
      game,
      participantId,
    );

    participant.htmlCode = htmlCode;
    participant.cssCode = cssCode;
  }
}
