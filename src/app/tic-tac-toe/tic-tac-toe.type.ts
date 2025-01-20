
export interface Cell {
  id: number;
  player?: Player;
}

export interface Player {
  id: string;
  name: string;
  color: string;
}
