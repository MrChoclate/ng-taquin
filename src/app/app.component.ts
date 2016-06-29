import { Component } from '@angular/core';
import { TaquinBoardComponent, TaquinService } from './taquin';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  directives: [TaquinBoardComponent],
  providers: [TaquinService]
})
export class AppComponent {
}
