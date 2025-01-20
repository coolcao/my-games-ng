export enum CellType {
  Wall = 'wall',  // 墙体
  Box = 'box',  // 箱子
  Target = 'target', // 箱子目标位置
  Player = 'player',  // 玩家
  Empty = 'empty',  // 空地
}
export interface Cell {
  type: CellType;
  value: string;
  isTarget?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}
