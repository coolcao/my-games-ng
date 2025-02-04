import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SokobanBoardComponent } from './sokoban-board/sokoban-board.component';
import { BoardGenComponent } from './board-gen/board-gen.component';

const routes: Routes = [
  { path: '', component: SokobanBoardComponent },
  { path: 'board-gen', component: BoardGenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SokobanRoutingModule { }
