import { Component, OnInit } from '@angular/core';
import { Cell } from '../sokoban.type';
import { CELL } from '../sokoban.data';

@Component({
  selector: 'app-board-gen',
  standalone: false,

  templateUrl: './board-gen.component.html',
  styleUrl: './board-gen.component.less'
})
export class BoardGenComponent implements OnInit {
  rows = 10;
  cols = 10;
  cells: Cell[] = [ CELL.EMPTY, CELL.WALL, CELL.BOX, CELL.TARGET, CELL.PLAYER ];

  selected: Cell = CELL.EMPTY;

  EMPTY: Cell = CELL.EMPTY;

  board: Cell[][] = [];

  ngOnInit(): void {
    this.board = this.initBoard();
  }

  setCell(row: number, col: number) {
    this.board[row][col] = { ...this.selected };
  }

  initBoard() {
    return new Array(this.rows).fill(null).map(() => {
      return new Array(this.cols).fill(null).map(() => CELL.EMPTY)
    });
  }

  onRowsColsChange() {
    this.rows = Number(this.rows);
    this.cols = Number(this.cols);
    this.board = this.initBoard();
  }

  getJSON() {
    if (this.board) {
      const result = this.board.map(row => {
        return row.map(cell => {
          const idx = this.cells.findIndex(c => c.type === cell.type);
          return idx;
        })
      })
      return JSON.stringify(result);
    }
    return '';
  }

  copyJSON() {
    const json = this.getJSON();
    navigator.clipboard.writeText(json);
    alert('地图数据已复制,可直接粘贴!');
  }
}
