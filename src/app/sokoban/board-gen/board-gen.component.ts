import { Component } from '@angular/core';
import { Cell } from '../sokoban.type';
import { CELL } from '../sokoban.data';

@Component({
  selector: 'app-board-gen',
  standalone: false,

  templateUrl: './board-gen.component.html',
  styleUrl: './board-gen.component.less'
})
export class BoardGenComponent {
  cells: Cell[] = [ CELL.EMPTY, CELL.WALL, CELL.BOX, CELL.TARGET, CELL.PLAYER ];

  selected: Cell = CELL.EMPTY;

  EMPTY: Cell = CELL.EMPTY;

  board: Cell[][] = new Array(8).fill(null).map(() => {
    return new Array(8).fill(null).map(() => CELL.EMPTY)
  });

  setCell(row: number, col: number) {
    this.board[row][col] = { ...this.selected };
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
