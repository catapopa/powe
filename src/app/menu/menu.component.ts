import { Component} from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'powe-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(public authService: AuthenticationService) { }
}
