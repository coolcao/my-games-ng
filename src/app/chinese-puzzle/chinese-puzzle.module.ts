import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ChinesePuzzleRoutingModule } from './chinese-puzzle-routing.module';
import { ChinesePuzzleBoardComponent } from './chinese-puzzle-board/chinese-puzzle-board.component';
import { ChinesePuzzleStore } from './chinese-puzzle.store';


@NgModule({
  declarations: [
    ChinesePuzzleBoardComponent
  ],
  imports: [
    CommonModule,
    ChinesePuzzleRoutingModule,
    DragDropModule,
  ],
  providers: [
    ChinesePuzzleStore
  ],
})
export class ChinesePuzzleModule { }
