import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class LightsOffStore {
  private _size = signal(0);
  private _board = signal<number[][]>([]);


  readonly size = this._size.asReadonly();
  readonly board = this._board.asReadonly();

  finished = computed(() => {
    return this.count() == 0;
  });
  // 当前亮灯数
  count = computed(() => {
    return this.board().flat().filter(cell => cell === 1).length;
  });


  init(size: number) {
    if (size < 3 || size > 9) {
      throw new Error('棋盘大小限定在3x3到9x9大小');
    }
    this._size.set(size);
    this._board.set(new Array(this.size()).fill(null).map(() => new Array(this.size()).fill(0)));
  }

  shuffle() {
    const board = this.board();
    for (let i = 0; i < this.size(); i++) {
      for (let j = 0; j < this.size(); j++) {
        board[i][j] = Math.floor(Math.random() * 2);
      }
    }
    // 如果初始化时灯都灭了，重新洗牌
    if (this.finished()) {
      this.shuffle();
    }
  }

  updateBoard(board: number[][]) {
    this._board.set([...board]);
  }
}