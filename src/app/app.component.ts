import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { RESTService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation,
    trigger('dropdownMembre', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show <=> hide', animate('200ms ease-out')),
      // transition('hide => show', animate('200ms ease-in'))
    ])
  ]
})
export class AppComponent {
  title = 'scrypteur';
  showDropdownMembre = false;

  isAuth() {
    return this.RESTService.isAuth;
  }

  logout() {
    this.RESTService.isAuth = false;
  }

  get etatDropdownMembre() {
    return this.showDropdownMembre ? 'show' : 'hide'
  }

  setFocusDropdownMembre(state: boolean) {
    this.showDropdownMembre = state
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  constructor(private RESTService: RESTService) { }
}
