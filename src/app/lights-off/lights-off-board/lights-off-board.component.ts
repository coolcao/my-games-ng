import { Component, effect, inject, OnInit } from '@angular/core';
import { LightsOffStore } from '../lights-off-store';
import { timer } from 'rxjs';

@Component({
  selector: 'app-lights-off-board',
  standalone: false,

  templateUrl: './lights-off-board.component.html',
  styleUrl: './lights-off-board.component.less'
})
export class LightsOffBoardComponent implements OnInit {
  private store = inject(LightsOffStore);
  private size = 3;

  steps = 0;

  board = this.store.board;
  finished = this.store.finished;
  count = this.store.count;
  showModal = false;

  constructor() {
    effect(() => {
      if (this.finished()) {
        timer(700).subscribe(() => {
          this.showModal = true;
        })
      } else {
        this.showModal = false;
      }
    });
  }

  ngOnInit(): void {
    this.store.init(this.size);
    this.store.shuffle();
  }

  toggleLight(row: number, col: number) {
    this.steps += 1;
    const board = this.board();
    // 当前格子
    board[row][col] = board[row][col] == 1 ? 0 : 1;
    if (row > 0) {
      board[row - 1][col] = board[row - 1][col] == 1 ? 0 : 1;
    }
    if (row < this.size - 1) {
      board[row + 1][col] = board[row + 1][col] == 1 ? 0 : 1;
    }
    if (col > 0) {
      board[row][col - 1] = board[row][col - 1] == 1 ? 0 : 1;

    }
    if (col < this.size - 1) {
      board[row][col + 1] = board[row][col + 1] == 1 ? 0 : 1;
    }

    this.store.updateBoard(board);
  }
  restart() {
    this.store.init(this.size);
    this.store.shuffle();
    this.steps = 0;
  }

}
