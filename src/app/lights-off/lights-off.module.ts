import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightsOffRoutingModule } from './lights-off-routing.module';
import { LightsOffBoardComponent } from './lights-off-board/lights-off-board.component';
import { LightsOffStore } from './lights-off-store';


@NgModule({
  declarations: [
    LightsOffBoardComponent
  ],
  imports: [
    CommonModule,
    LightsOffRoutingModule
  ],
  providers: [
    LightsOffStore
  ],
})
export class LightsOffModule { }
