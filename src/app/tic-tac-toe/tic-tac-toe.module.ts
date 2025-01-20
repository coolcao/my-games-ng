import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { TicTacToeBoardComponent } from './tic-tac-toe-board/tic-tac-toe-board.component';


@NgModule({
  declarations: [
    TicTacToeBoardComponent
  ],
  imports: [
    CommonModule,
    TicTacToeRoutingModule
  ]
})
export class TicTacToeModule { }
