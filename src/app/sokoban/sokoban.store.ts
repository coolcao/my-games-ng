import { computed, Injectable, signal } from "@angular/core";
import { Cell, CellType, Position } from "./sokoban.type";
import { List } from "immutable";
import { loadData, dataSetNames } from "./sokoban.data";

@Injectable()
export class SokobanStore {
  private _board = signal<List<List<Cell>>>(List([]));
  private _position = signal<Position>({ x: 3, y: 2 });
  private _targetPositions = signal<List<Position>>(List([]));
  private _dataSetName = signal<string>(dataSetNames[0]);

  readonly board = this._board.asReadonly();
  readonly position = this._position.asReadonly();
  readonly targetPositions = this._targetPositions.asReadonly();
  readonly dataSetName = this._dataSetName.asReadonly();

  finished = computed(() => {
    return this.targetPositions().every(p => this.board().get(p.x)!.get(p.y)!.type === CellType.Box);
  });

  initBoard() {
    const cells = loadData(this._dataSetName());
    const board = List(cells.map(row => List(row)))
    this._board.set(board);
    // 标记目标点位和玩家位置
    this._targetPositions.set(List([]));
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

  updateDataSetName(dataSetName: string) {
    this._dataSetName.set(dataSetName);
  }

}
