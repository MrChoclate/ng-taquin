import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class TaquinService {
  image: Observable<HTMLImageElement>;

  constructor() {
    let observable = Observable.create(
      function (observer: Observer<HTMLImageElement>) {
        let img = new Image();
        img.src = 'images/test.jpg';
        img.onload = () => observer.next(img);
      }
    );
    this.image = observable;
  }

  getPartialImage(x: number, y: number): Promise<string> {
    let self = this;
    let SIZE = 3;
    let promise = new Promise<string>(function (resolve, reject) {
      self.image.subscribe(function (img) {
        let canvas = document.createElement('canvas');
        canvas.width = img.width / SIZE;
        canvas.height = img.height / SIZE;
        let img_x = - canvas.width * x;
        let img_y = - canvas.height * y;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, img_x, img_y, img.width, img.height);
        let dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      });
    });

    return promise;
  }

}
