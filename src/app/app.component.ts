import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rewaa-case-study';

  constructor(private route: Router) {
    /**
     * Temporary for directly opening component
     */
    this.route.navigate(['/order-detail']);
  }
}
