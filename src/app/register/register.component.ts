import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RESTService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nom = "";
  password1 = "";
  password2 = "";
  email = "";
  hide1 = true;
  hide2 = true;
  data: any = [];

  emailcheck = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordcheck1 = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);
  passwordcheck2 = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  getErrorMessageEmail() {
    if (this.emailcheck.hasError('required')) {
      return 'Email requis';
    }

    return this.emailcheck.hasError('email') ? 'Email invalide' : '';
  }

  getErrorMessagePassword1() {
    if (this.passwordcheck1.hasError('required')) {
      return 'Mot de passe requis';
    }

    return this.passwordcheck1.hasError('minlength') ? 'Mot de passe incorrect' : '';
  }

  getErrorMessagePassword2() {
    if (this.passwordcheck2.hasError('required')) {
      return 'Mot de passe requis';
    }

    return this.passwordcheck2.hasError('minlength') ? 'Mot de passe incorrect' : '';
  }

  register() {
    var data = [this.nom,this.password1,this.password2,this.email];
    var check = true;
    data.forEach(element => {
      if (element === '') {
        check = false;
      }
    });

    if (this.password1 !== this.password2) {
      check = false;
    }

    if (!check) {
      return
    }
    
    var dataPOST = {
      'user': this.nom,
      'password': this.password1,
      'email': this.email
    };
    this.RESTService.POST('users/register',dataPOST).subscribe(
      response => {
        this.data = response;
        if (this.data['register']) {
          alert(this.data['message'])
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
