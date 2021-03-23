import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import { RESTService } from './services/rest.service';
import {TranslateService} from '@ngx-translate/core';
import { Inotification } from './interface/notification'


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
    ]),

    trigger('dropdownLang', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show <=> hide', animate('200ms ease-out')),
      // transition('hide => show', animate('200ms ease-in'))
    ]),

    trigger('notification', [
      state('show', style({
        opacity: 1,
      })),
      state('hide', style({
        opacity: 0,
        "pointer-events": "none"
      })),
      transition('show => hide',
        group([
          animate('1000ms ease-out'),
        ]),
      ),
      transition('hide => show',
        group([
          animate('600ms ease-out'),
        ]),
      ),
    ])
    
  ]
})

export class AppComponent {
  title = 'Shop4u';
  showDropdownNav = "menu";
  showDropdownMembre = false;
  showDropdownLang = false;
  showNotification = false;

  notificationTitre?: String;
  notificationMessage?: String;
  notificationType?: String;

  isAuth() {
    return this.RESTService.isAuth && (this.RESTService.token != "");
  }

  logout() {
    this.RESTService.isAuth = false;
    this.RESTService.token = "";
  }

  toggleDropdownNav() {
    if (this.showDropdownNav == "menu") {
      this.showDropdownNav = "menu_open"
      this.showDropdownMembre = true
    } else {
      this.showDropdownNav = "menu"
      this.showDropdownMembre = false
    }
  }
  
  get notificationGetIcon() {
    switch (this.notificationType) {
      case "error":
        return "error_outline"
      case "ok":
        return "check_circle_outline"
      default:
        return ""
    }
  }
  
  notification(data: Inotification) {
    this.notificationTitre = data.titre
    this.notificationMessage = data.message
    this.notificationType = data.type
    this.showNotification = true
    setTimeout(() => {
      this.showNotification = false
    }, 4000);
  }

  switchLang(language: string) {
    localStorage.setItem('locale', language);  
    this.translate.use(language);  
  }

  get etatNotification() {
    return this.showNotification ? 'show' : 'hide'
  }

  get etatDropdownMembre() {
    return this.showDropdownMembre ? 'show' : 'hide'
  }

  get etatDropdownLang() {
    return this.showDropdownLang ? 'show' : 'hide'
  }

  setFocusDropdownMembre(state: boolean) {
    this.showDropdownMembre = state
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  checkLoading() {
    return true
  }

  languages = ['EN', 'FR'];

  ngOnInit() {
  }
  
  constructor(
    private Router: Router,
    private RESTService: RESTService,
    public translate: TranslateService
    ) {

      // console.log(translate.getLangs())
      // translate.setTranslation('en', en);
      // translate.setTranslation('fr', fr);
      // translate.setTranslation('fr', {
      //   HOME: 'Accueil'
      // });
        
      // translate.setDefaultLang('en');
      // translate.use('en');
      // translate.getTranslation("i18n/en.json")
    }
}
