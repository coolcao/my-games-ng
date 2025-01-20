import { computed, inject, signal } from "@angular/core";
import { ToolsService } from "../common/tools.service";
import { Piece } from "./chinese-puzzle.type";

const pieces: Piece[] = [
  { id: 1, name: '曹操', width: 2, height: 2, x: 1, y: 0, img: 'assets/img/chinese-puzzle/曹操.png' },
  { id: 2, name: '关羽', width: 2, height: 1, x: 1, y: 2, img: 'assets/img/chinese-puzzle/关羽.png' },
  { id: 3, name: '张飞', width: 1, height: 2, x: 0, y: 0, img: 'assets/img/chinese-puzzle/张飞.png' },
  { id: 4, name: '赵云', width: 1, height: 2, x: 3, y: 0, img: 'assets/img/chinese-puzzle/赵云.png' },
  { id: 5, name: '马超', width: 1, height: 2, x: 0, y: 2, img: 'assets/img/chinese-puzzle/马超.png' },
  { id: 6, name: '黄忠', width: 1, height: 2, x: 3, y: 2, img: 'assets/img/chinese-puzzle/黄忠.png' },
  { id: 7, name: '卒1', width: 1, height: 1, x: 0, y: 4, img: 'assets/img/chinese-puzzle/卒.png' },
  { id: 8, name: '卒2', width: 1, height: 1, x: 1, y: 3, img: 'assets/img/chinese-puzzle/卒.png' },
  { id: 9, name: '卒3', width: 1, height: 1, x: 2, y: 3, img: 'assets/img/chinese-puzzle/卒.png' },
  { id: 10, name: '卒4', width: 1, height: 1, x: 3, y: 4, img: 'assets/img/chinese-puzzle/卒.png' }
];

export class ChinesePuzzleStore {
  private tools = inject(ToolsService);
  private _boardWidth = signal(4);
  private _boardHeight = signal(5);

  private _pieces = signal(this.tools.deepClone(pieces));
  private _board = signal<string[][]>([]);

  readonly pieces = this._pieces.asReadonly();
  readonly board = this._board.asReadonly();
  readonly boardWidth = this._boardWidth.asReadonly();
  readonly boardHeight = this._boardHeight.asReadonly();

  finished = computed(() => {
    const caocao = this.pieces().find(p => p.name == '曹操');

    if (caocao && caocao.x == 1 && caocao.y == 3) {
      return true;
    }
    return false;
  });


  initBoard() {
    const board = new Array(this.boardHeight()).fill(null).map(() => new Array(this.boardWidth()).fill(''));
    pieces.forEach(piece => {
      for (let i = 0; i < piece.height; i++) {
        for (let j = 0; j < piece.width; j++) {
          board[piece.y + i][piece.x + j] = piece.name;
        }
      }
    })
    this._board.set(board);
  }

  updateBoard(board: string[][]) {
    this._board.set(this.tools.deepClone(board));
  }
  updatePiece(piece: Piece) {
    const pieces = this.pieces();
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].id == piece.id) {
        pieces[i].x = piece.x;
        pieces[i].y = piece.y;
      }
    }

    this._pieces.set(this.tools.deepClone(pieces));
  }




}
