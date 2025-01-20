import { Component, inject } from '@angular/core';
import { TicTacToeStore } from '../tic-tac-toe.store';
import { Cell } from '../tic-tac-toe.type';

@Component({
  selector: 'app-tic-tac-toe-board',
  standalone: false,

  templateUrl: './tic-tac-toe-board.component.html',
  styleUrl: './tic-tac-toe-board.component.less'
})
export class TicTacToeBoardComponent {

  store = inject(TicTacToeStore);

  cells = this.store.cells;
  currentPlayer = this.store.currentPlayer;
  winner = this.store.winner;
  count = this.store.count;


  clickCell(cell: Cell) {
    if (cell.player) {
      return;
    }
    if (this.winner()) {
      return;
    }

    cell.player = this.currentPlayer();
    this.store.updateCell(cell);
    this.store.nextPlayer();
    this.store.addCount();
  }

  restart() {
    this.store.initBoard();
  }

}
