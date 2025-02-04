import { Component, HostListener, inject, OnInit } from '@angular/core';
import { SokobanStore } from '../sokoban.store';
import { CellType } from '../sokoban.type';
import { CELL, dataSetNames } from '../sokoban.data';

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
  finished = this.store.finished;
  dataSetName = this.store.dataSetName;

  dataSetNames = dataSetNames;

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

    if (this.isValidMove(newX, newY, CellType.Player)) {
      let board = this.board();
      if (board.get(newX)!.get(newY)!.type === CellType.Box) {
        const newBoxX = newX + dx;
        const newBoxY = newY + dy;
        if (this.isValidMove(newBoxX, newBoxY, CellType.Box)) {
          // 移动箱子，并保留目标点位信息
          board = board.set(newBoxX, board.get(newBoxX)!.set(newBoxY, { ...CELL.BOX, isTarget: board.get(newBoxX)!.get(newBoxY)!.isTarget }));
          // 恢复原位置状态(如果是目标点位，则恢复为目标点位)
          if (this.targetPositions().find(p => p.x == newX && p.y == newY)) {
            board = board.set(newX, board.get(newX)!.set(newY, { ...CELL.TARGET, isTarget: true }));
          } else {
            board = board.set(newX, board.get(newX)!.set(newY, { ...CELL.EMPTY }));
          }
          // 移动玩家
          if (this.targetPositions().find(p => p.x == this.playerPosition().x && p.y == this.playerPosition().y)) {
            board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...CELL.TARGET, isTarget: true }));
          } else {
            board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...CELL.EMPTY }));
          }
          board = board.set(newX, board.get(newX)!.set(newY, { ...CELL.PLAYER }));
          this.store.updatePosition(newX, newY);
          this.store.updateBoard(board);
        }
      } else {
        let board = this.board();
        if (this.targetPositions().find(p => p.x == this.playerPosition().x && p.y == this.playerPosition().y)) {
          board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...CELL.TARGET, isTarget: true }));
        } else {
          board = board.set(this.playerPosition().x, board.get(this.playerPosition().x)!.set(this.playerPosition().y, { ...CELL.EMPTY }));
        }
        board = board.set(newX, board.get(newX)!.set(newY, { ...CELL.PLAYER }));
        this.store.updatePosition(newX, newY);
        this.store.updateBoard(board);
      }
    }
  }

  isValidMove(x: number, y: number, cellType: CellType): boolean {
    const rows = this.board().size;
    const cols = this.board().first()?.size;
    const cell = this.board().get(x)?.get(y);
    if (!rows || !cols || !cell) return false;
    if (cellType == CellType.Player) {
      return (x >= 0 && x < rows && y >= 0 && y < cols && cell.type != CellType.Wall);
    }
    if (cellType == CellType.Box) {
      return (x >= 0 && x < rows && y >= 0 && y < cols && cell.type != CellType.Wall && cell.type != CellType.Box);
    }
    return false;
  }

  changeDataSet(dataSetName: string): void {
    this.store.updateDataSetName(dataSetName);
    this.store.initBoard();
  }

  onDataSetChange(event: Event): void {
    // 让select失去焦点，避免select组件捕获到keydown事件
    (event.target as HTMLSelectElement).blur();
  }


}
