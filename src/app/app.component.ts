import { Component } from '@angular/core';
import { AuthRequestService } from './services/auth.request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wallet';

  constructor(private dataService: AuthRequestService) {
    //dataService.getLoggedInName.subscribe(name => this.changeName(name));
  }
}
