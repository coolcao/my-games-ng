import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SokobanBoardComponent } from './sokoban-board/sokoban-board.component';

const routes: Routes = [
  { path: '', component: SokobanBoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SokobanRoutingModule { }
