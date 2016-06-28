import { Component, OnInit, HostListener } from '@angular/core';
import { TaquinService } from './taquin.service';
import { TaquinPiece } from './taquin-piece';
import { TaquinPieceComponent } from './taquin-piece.component';


@Component({
  moduleId: module.id,
  selector: 'taquin-board',
  templateUrl: 'taquin-board.component.html',
  styleUrls: ['taquin-board.component.css'],
  directives: [TaquinPieceComponent]
})
export class TaquinBoardComponent implements OnInit {
  SIZE = 3;
  taquinPieces: TaquinPiece[][];
  selectedCoord: number[];


  constructor(private taquinService: TaquinService) {
  }

  ngOnInit() {
    this.reset();
    this.shuffle();
  }

  reset() {
    this.taquinPieces = [];
    for (let i = 0; i < this.SIZE; i++) {
      this.taquinPieces.push([]);
      for (let j = 0; j < this.SIZE; j++) {
        let piece = new TaquinPiece(this.SIZE * i + j, i, j, i == 0 && j == 0)
        this.taquinPieces[i].push(piece);
      }
    }
    this.selectedCoord = [0, 0];
  }

  private _randomPick(): number {
    return Math.floor((Math.random() * this.SIZE + 1));
  }

  private _randomDir(): number {
    return Math.floor((Math.random() * this.SIZE)) - 1;
  }

  isValid(srcX, srcY, destX, destY) {
    let inBoard = srcX < this.SIZE && 0 <= srcX &&
                  srcY < this.SIZE && 0 <= srcY &&
                  destY < this.SIZE && 0 <= destY &&
                  destX < this.SIZE && 0 <= destX;
    let validDist = Math.abs(srcX - destX) <= 1 &&
                    Math.abs(srcY - destY) <= 1 &&
                    Math.abs(srcX - destX) + Math.abs(srcY - destY) == 1;
    return inBoard && validDist;
  }

  swap(srcX, srcY, destX, destY): boolean {
    if (this.isValid(srcX, srcY, destX, destY)) {
      [
        this.taquinPieces[srcX][srcY], this.taquinPieces[destX][destY]
      ] = [
        this.taquinPieces[destX][destY], this.taquinPieces[srcX][srcY]
      ];
      return true;
    }
    return false;
  }

  move(x, y) {
    let [srcX, srcY] = this.selectedCoord;
    this.swap(srcX, srcY, x, y);
  }

  shuffle() {
    for (let i = 0; i < 100; i++) {
      let x = this._randomPick();
      let y = this._randomPick();
      let xDirection = this._randomDir();
      let yDirection = this._randomDir();

      this.swap(x, y, x + xDirection, y + yDirection);
    }
  }

  movePiece(x: number, y: number) {
    let [srcX, srcY] = this.selectedCoord;
    let selectedPiece = this.taquinPieces[srcX][srcY];

    if (this.swap(srcX, srcY, x, y)) {
      this.selectedCoord = [x, y];
    }
  }

  onTap(id: number) {
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        if (this.taquinPieces[i][j].id == id) {
          var toMovePieceX = i;
          var toMovePieceY = j;
        }
      }
    }

    this.movePiece(toMovePieceX, toMovePieceY);
  }

  @HostListener('document:keydown', ['$event']) onKeypress (e: KeyboardEvent) {
    let [dirX, dirY] = [0, 0];
    switch (e.key) {
      case "ArrowDown":
        dirY += 1;
        break;
      case "ArrowUp":
        dirY -= 1;
        break;
      case "ArrowLeft":
        dirX -= 1;
        break;
      case "ArrowRight":
        dirX += 1;
        break;
    }

    let [x, y] = this.selectedCoord;
    this.movePiece(x + dirX, y + dirY);
  }

}
