export interface GameInterface {
  id: string;
  participant: Participant[];
  progress: Progress;
}


export enum Progress {
  DONE,
  NOT_STARTED,
  IN_PROGRESS,
}

export interface Participant {
  displayName: string;
  id: string;
  htmlCode: string;
  cssCode: string;
}
