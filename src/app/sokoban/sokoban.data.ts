import { Cell, CellType } from "./sokoban.type";

const WALL: Cell = { type: CellType.Wall, value: '🟫' };
const BOX: Cell = { type: CellType.Box, value: '📦' };
const TARGET: Cell = { type: CellType.Target, value: '🌟', isTarget: true };
const PLAYER: Cell = { type: CellType.Player, value: '🙎‍♂️' };
const EMPTY: Cell = { type: CellType.Empty, value: '' };

// 0: EMPTY 1:WALL 2:BOX 3:TARGET 4:PLAYER
const cells = [
  EMPTY, WALL, BOX, TARGET, PLAYER
];

const dataSet: Record<string, number[][]> = {
  '第一关': [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 0, 1],
    [1, 0, 0, 4, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 3, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ],
  '第二关': [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 2, 0, 3, 1, 1],
    [1, 0, 1, 0, 4, 0, 1, 1],
    [1, 0, 1, 0, 2, 0, 1, 1],
    [1, 0, 0, 3, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
  ],
  '第三关': [
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 3, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 2, 0, 2, 3, 1],
    [1, 3, 0, 2, 4, 1, 1, 1],
    [1, 1, 1, 1, 2, 1, 0, 0],
    [0, 0, 0, 1, 3, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
  ],
  '第四关': [[1, 1, 1, 1, 0, 0, 0, 0], [1, 3, 0, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0, 0], [1, 0, 0, 1, 1, 1, 1, 1], [1, 0, 2, 4, 2, 0, 3, 1], [1, 0, 0, 2, 3, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
  '第五关': [[1, 1, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1, 1], [1, 0, 2, 0, 4, 0, 0, 1], [1, 2, 2, 1, 1, 2, 0, 1], [1, 0, 2, 3, 1, 0, 0, 1], [1, 3, 3, 3, 0, 3, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
};

// 导出
export const CELL = {
  WALL, BOX, TARGET, PLAYER, EMPTY
}

export const dataSetNames = Object.keys(dataSet);

export const loadData = (name: string) => {
  let result: Cell[][] = [];
  if (name in dataSet) {
    result = dataSet[name].map(row => row.map(cell => cells[cell]));
  }
  return result;
}
