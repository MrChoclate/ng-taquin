import { Component, OnInit, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { TaquinService } from './taquin.service';
import { TaquinPiece } from './taquin-piece';


@Component({
  moduleId: module.id,
  selector: 'taquin-piece',
  templateUrl: 'taquin-piece.component.html',
  styleUrls: ['taquin-piece.component.css'],
})
export class TaquinPieceComponent implements OnInit {
  @Input() piece: TaquinPiece;
  @Output() onTap = new EventEmitter<number>();
  private imageData: string;


  constructor(private taquinService: TaquinService) {}

  ngOnInit(): void {
    let [x, y] = [this.piece.origineX, this.piece.origineY];

    this.taquinService.getPartialImage(x, y).subscribe(
      (data) => this.imageData = data
    );
  }

  @HostListener('click', ['$event']) onClick(e): void {
    this.onTap.emit(this.piece.id);
  }

}
