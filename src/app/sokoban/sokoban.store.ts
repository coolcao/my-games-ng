import { computed, Injectable, signal } from "@angular/core";
import { Cell, CellType, Position } from "./sokoban.type";
import { List } from "immutable";

export const WALL: Cell = { type: CellType.Wall, value: '🟫' };
export const BOX: Cell = { type: CellType.Box, value: '📦' };
export const TARGET: Cell = { type: CellType.Target, value: '🌟', isTarget: true };
export const PLAYER: Cell = { type: CellType.Player, value: '🙎‍♂️' };
export const EMPTY: Cell = { type: CellType.Empty, value: '' };

const cells: Cell[][] = [
  [{ ...EMPTY }, { ...EMPTY }, { ...WALL }, { ...WALL }, { ...WALL }, { ...EMPTY }, { ...EMPTY }, { ...EMPTY }],
  [{ ...EMPTY }, { ...EMPTY }, { ...WALL }, { ...TARGET }, { ...WALL }, { ...EMPTY }, { ...EMPTY }, { ...EMPTY }],
  [{ ...EMPTY }, { ...EMPTY }, { ...WALL }, { ...EMPTY }, { ...WALL }, { ...WALL }, { ...WALL }, { ...WALL }],
  [{ ...WALL }, { ...WALL }, { ...WALL }, { ...BOX }, { ...EMPTY }, { ...BOX }, { ...TARGET }, { ...WALL }],
  [{ ...WALL }, { ...TARGET }, { ...EMPTY }, { ...BOX }, { ...PLAYER }, { ...WALL }, { ...WALL }, { ...WALL }],
  [{ ...WALL }, { ...WALL }, { ...WALL }, { ...WALL }, { ...BOX }, { ...WALL }, { ...EMPTY }, { ...EMPTY }],
  [{ ...EMPTY }, { ...EMPTY }, { ...EMPTY }, { ...WALL }, { ...TARGET }, { ...WALL }, { ...EMPTY }, { ...EMPTY }],
  [{ ...EMPTY }, { ...EMPTY }, { ...EMPTY }, { ...WALL }, { ...WALL }, { ...WALL }, { ...EMPTY }, { ...EMPTY }],
];

@Injectable()
export class SokobanStore {
  private _board = signal<List<List<Cell>>>(List([]));
  private _position = signal<Position>({ x: 3, y: 2 });
  private _targetPositions = signal<List<Position>>(List([]));

  readonly board = this._board.asReadonly()
  readonly position = this._position.asReadonly()
  readonly targetPositions = this._targetPositions.asReadonly()

  finished = computed(() => {
    return this.targetPositions().every(p => this.board().get(p.x)!.get(p.y)!.type === CellType.Box);
  });

  initBoard() {
    const board = List(cells.map(row => List(row)))
    this._board.set(board);
    // 标记目标点位和玩家位置
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j].isTarget) {
          let targetPositions = this._targetPositions();
          targetPositions = targetPositions.push({ x: i, y: j });
          this._targetPositions.set(targetPositions);
        }
        if (cells[i][j].type === CellType.Player) {
          this._position.set({ x: i, y: j });
        }
      }
    }
  }

  updateBoard(board: List<List<Cell>>) {
    this._board.set(board);
  }

  updatePosition(x: number, y: number) {
    this._position.set({ x, y });
  }




}
