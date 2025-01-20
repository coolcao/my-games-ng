import { computed, Injectable, signal } from "@angular/core";
import { Cell, Player } from "./tic-tac-toe.type";

const cells: Cell[][] = [
  [{ id: 1, }, { id: 2, }, { id: 3, }],
  [{ id: 4, }, { id: 5, }, { id: 6, }],
  [{ id: 7, }, { id: 8, }, { id: 9, }],
];
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const player1 = { id: 'player1', name: '红方', color: '🔴' };
const player2 = { id: 'player2', name: '蓝方', color: '🔵' };

@Injectable({
  providedIn: 'root'
})
export class TicTacToeStore {
  private _cells = signal(cells.map(row => row.map(cell => ({ ...cell }))));
  private _currentPlayer = signal<Player>({ ...player1 });
  private _count = signal(0);

  readonly cells = this._cells.asReadonly();
  readonly currentPlayer = this._currentPlayer.asReadonly();
  readonly count = this._count.asReadonly();

  // 计算并返回当前赢家，或者空字符串
  winner = computed(() => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern.map(i => this._cells()[Math.floor(i / 3)][i % 3]);
      if (a.player && b.player && c.player && a.player.id === b.player.id && b.player.id === c.player.id) {
        return a.player;
      }
    }
    return null;
  });

  nextPlayer(): void {
    const currentPlayer = this._currentPlayer();
    if (currentPlayer.id === 'player1') {
      this._currentPlayer.set({ ...player2 });
    } else {
      this._currentPlayer.set({ ...player1 });
    }
  }

  updateCell(cell: Cell) {
    this._cells.set(this._cells().map(row => row.map(c => c.id === cell.id ? { ...c, value: this._currentPlayer().color } : c)));
  }

  addCount() {
    this._count.set(this._count() + 1);
  }

  initCells() {
    this._cells.set(cells.map(row => row.map(cell => ({ ...cell }))));
  }
  initPlayer() {
    this._currentPlayer.set({ ...player1 });
  }
  initBoard() {
    this.initCells();
    this.initPlayer();
    this._count.set(0);
  }


}
