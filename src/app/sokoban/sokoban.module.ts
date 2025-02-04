import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SokobanRoutingModule } from './sokoban-routing.module';
import { SokobanBoardComponent } from './sokoban-board/sokoban-board.component';
import { SokobanStore } from './sokoban.store';
import { SokobanCellComponent } from './sokoban-cell/sokoban-cell.component';
import { BoardGenComponent } from './board-gen/board-gen.component';


@NgModule({
  declarations: [
    SokobanBoardComponent,
    SokobanCellComponent,
    BoardGenComponent
  ],
  imports: [
    CommonModule,
    SokobanRoutingModule,
    FormsModule,
  ],
  providers: [
    SokobanStore
  ],
})
export class SokobanModule { }
