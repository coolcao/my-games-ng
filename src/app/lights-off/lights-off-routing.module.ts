import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightsOffBoardComponent } from './lights-off-board/lights-off-board.component';

const routes: Routes = [
  { path: '', component: LightsOffBoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightsOffRoutingModule { }
