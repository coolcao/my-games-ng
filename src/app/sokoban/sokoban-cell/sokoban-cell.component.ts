import { Component, Input, OnInit } from '@angular/core';
import { Cell, CellType } from '../sokoban.type';

@Component({
  selector: 'app-sokoban-cell',
  standalone: false,

  templateUrl: './sokoban-cell.component.html',
  styleUrl: './sokoban-cell.component.less'
})
export class SokobanCellComponent {

  CellType = CellType;

  @Input()
  cell: Cell | null = null;

}
