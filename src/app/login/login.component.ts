import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RESTService } from '../services/rest.service';

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

    this.RESTService.GET('login').subscribe(
      response => {
          this.data = response;
      })

  }

  constructor(
    private RESTService: RESTService
  ) { }

  ngOnInit(): void {
  }

}
