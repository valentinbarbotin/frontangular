import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RESTService } from '../services/rest.service';
import { Router } from '@angular/router';

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

  getErrorMessagePassword() {
    if (this.passwordcheck.hasError('required')) {
      return 'Mot de passe requis';
    }

    return ''
  }

  login() {
    var data = [this.nomEmail,this.password];
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
    this.RESTService.POST('users/login',dataPOST).subscribe(
      response => {
        this.data = response;
        if (this.data['login']) {
          alert(this.data['message'])
          this.RESTService.isAuth = true;
          this.Router.navigate(['/']);
        } else {
          alert(this.data['message'])
        }
    })
  }

  constructor(
    private RESTService: RESTService,
    private Router: Router
  ) { }

  ngOnInit(): void {
  }

}
