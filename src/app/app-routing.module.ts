import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'lights-off', loadChildren: () => import('./lights-off/lights-off.module').then(m => m.LightsOffModule) },
  { path: 'puzzle', loadChildren: () => import('./puzzle/puzzle.module').then(m => m.PuzzleModule) },
  { path: 'tic-tac-toe', loadChildren: () => import('./tic-tac-toe/tic-tac-toe.module').then(m => m.TicTacToeModule) },
  { path: 'chinese-puzzle', loadChildren: () => import('./chinese-puzzle/chinese-puzzle.module').then(m => m.ChinesePuzzleModule) },
  { path: 'hexxagon', loadChildren: () => import('./hexxagon/hexxagon.module').then(m => m.HexxagonModule) },
  { path: 'sokoban', loadChildren: () => import('./sokoban/sokoban.module').then(m => m.SokobanModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
