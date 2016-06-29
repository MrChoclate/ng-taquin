import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class TaquinService {
  SIZE = 3;
  image: Observable<HTMLImageElement>;
  imageData: Observable<string>[][];

  constructor() {
    let observable = Observable.create(
      function (observer: Observer<HTMLImageElement>) {
        let img = new Image();
        img.src = 'images/test.jpg';
        img.onload = () => observer.next(img);
      }
    );
    this.image = observable;

    this.imageData = [];
    for (let i = 0; i < this.SIZE; i++) {
      this.imageData.push([]);
      for (let j = 0; j < this.SIZE; j++) {
        this.imageData[i].push(
          this.image.map<string>((img) =>
            this._buildDataURL(img, i, j)
          )
        );
      }
    }
  }

  _buildDataURL(img, x, y): string {
    let canvas = document.createElement('canvas');
    canvas.width = img.width / this.SIZE;
    canvas.height = img.height / this.SIZE;
    let img_x = - canvas.width * x;
    let img_y = - canvas.height * y;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, img_x, img_y, img.width, img.height);
    let dataURL = canvas.toDataURL('image/png');

    return dataURL;
  }

  getPartialImage(x: number, y: number): Observable<string> {
    return this.imageData[x][y];
  }

}
