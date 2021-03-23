import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RESTService } from '../services/rest.service';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nomEmail = "";
  password = "";
  hide1 = true;
  data: any = [];

  emailcheck = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordcheck = new FormControl('', [
    Validators.required
  ]);

  afficherNotif(titre: String, message: String, type: String) {
    this.AppComponent.notification({
      'titre': titre,
      'message': message,
      'type': type
      //  check_circle_outline
      //  error_outline
    })
  }

  getErrorMessagePassword() {
    if (this.passwordcheck.hasError('required')) {
      return 'Mot de passe requis';
    }

    return ''
  }

  login() {
    var data = [this.nomEmail, this.password];
    var check = true;
    data.forEach(element => {
      if (element === '') {
        check = false;
      }
    });

    if (!check) {
      return
    }

    var dataPOST = {
      'nomEmail': this.nomEmail,
      'password': this.password
    };

    this.RESTService.POST('users/login', dataPOST).subscribe(
      response => {
        this.data = response;
        console.log(response)
        if (this.data['login']) {
          this.afficherNotif('Connexion',this.data['message'],'ok')
          this.RESTService.isAuth = true;
          if (this.data['token']) {
            this.RESTService.token = this.data['token'];
          }
          this.Router.navigate(['/']);
        } else {
          if (!this.data['login']) {
            this.afficherNotif('Connexion',this.data['message'],'error')
            // alert(this.data['message'])
          } else {
            console.log("in progress")
          }
        }
      },
      error => {
        console.log(error)
      }
    )

  }

  constructor(
    private RESTService: RESTService,
    private Router: Router,
    private AppComponent: AppComponent
  ) { }

  ngOnInit(): void {
  }

}
