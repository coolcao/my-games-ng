import { Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  standalone: false,

  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.less'
})
export class StartPageComponent {

  games = [
    { name: '关灯游戏', path: 'lights-off', backgroundImage: 'assets/img/snip/lights-off.png' },
    { name: '拼图游戏', path: 'puzzle', backgroundImage: 'assets/img/snip/puzzle.png' },
    { name: '井字棋游戏', path: 'tic-tac-toe', backgroundImage: 'assets/img/snip/tic-tac-toe.png' },
    { name: '华容道', path: 'chinese-puzzle', backgroundImage: 'assets/img/snip/chinese-puzzle.png' },
    { name: '六角跳跳棋', path: 'hexxagon', backgroundImage: 'assets/img/snip/hexxagon.png' },
    { name: '推箱子', path: 'sokoban', backgroundImage: 'assets/img/snip/sokoban.png' },
  ];

}
