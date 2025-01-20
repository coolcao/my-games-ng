import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeBoardComponent } from './tic-tac-toe-board/tic-tac-toe-board.component';

const routes: Routes = [
  { path: '', component: TicTacToeBoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicTacToeRoutingModule { }
