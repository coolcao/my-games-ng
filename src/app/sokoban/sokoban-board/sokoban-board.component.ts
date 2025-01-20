import { Component, HostListener, inject, OnInit } from '@angular/core';
import { BOX, EMPTY, PLAYER, SokobanStore, TARGET } from '../sokoban.store';
import { CellType } from '../sokoban.type';

@Component({
  selector: 'app-sokoban-board',
  standalone: false,
  templateUrl: './sokoban-board.component.html',
  styleUrl: './sokoban-board.component.less'
})
export class SokobanBoardComponent implements OnInit {
  store = inject(SokobanStore);
  board = this.store.board;
  playerPosition = this.store.position;
  targetPositions = this.store.targetPositions;
  finished = this.store.finished

  ngOnInit(): void {
    this.store.initBoard();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event.key);
    switch (event.key) {
      case 'ArrowUp': {
        this.movePlayer(-1, 0);
        break;
      }
      case 'ArrowDown': {
        this.movePlayer(1, 0);
        break;
      }
      case 'ArrowLeft': {
        this.movePlayer(0, -1);
        break;
      }
      case 'ArrowRight': {
        this.movePlayer(0, 1);
        break;
      }
      default:
        return;
    }
  }

  movePlayer(dx: number, dy: number): void {
    const newX = this.playerPosition().x + dx;
    const newY = this.playerPosition().y + dy;

    if (this.isValidMove(newX, newY)) {
      let board = this.board();
      if (board.get(newX)!.get(newY)!.type === CellType.Box) {
        const newBoxX = newX + dx;
        const newBoxY = newY + dy;
        if (this.isValidMove(newBoxX, newBoxY)) {
          // 移动箱子，并保留目标点位信息
          board = board.set(newBoxX, board.get(newBoxX)!.set(newBoxY, { ...BOX, isTarget: board.get(newBoxX)!.get(newBoxY)!.isTarget }));
          // 恢复原位置状态(如果是目标点位，则恢复为目标点位)
          if (this.targetPositions().find(p => p.x == newX && p.y == newY)) {
            board = board.set(newX, board.get(newX)!.set(newY, { ...TARGET, isTarget: true }));
          } else {
            board = board.set(newX, board.get(newX)!.set(newY, { ...EMPTY }));
          }
          // 移动玩家
          board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...EMPTY }));
          board = board.set(newX, board.get(newX)!.set(newY, { ...PLAYER }));
          this.store.updatePosition(newX, newY);
          this.store.updateBoard(board);
        }
      } else {
        let board = this.board();
        if (this.targetPositions().find(p => p.x == this.playerPosition().x && p.y == this.playerPosition().y)) {
          board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...TARGET, isTarget: true }));
        } else {
          board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...EMPTY }));
        }
        board = board.set(newX, board.get(newX)!.set(newY, { ...PLAYER }));
        this.store.updatePosition(newX, newY);
        this.store.updateBoard(board);
      }
    }
  }

  isValidMove(x: number, y: number): boolean {
    return (
      x >= 0 &&
      x < this.board().size &&
      y >= 0 &&
      y < this.board().first()!.size &&
      this.board().get(x)?.get(y)?.type !== CellType.Wall
    );
  }


}
