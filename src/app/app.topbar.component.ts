import { Component } from '@angular/core';
import { AuthenticationService } from 'padrao';
import { RaizComponent } from './raiz/raiz.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
  resp: boolean;
  constructor(public app: RaizComponent, public authenticationService: AuthenticationService) { }

}
