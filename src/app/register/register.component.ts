import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  nom = "";
  email = "";
  password1 = "";
  password2 = "";
  hide1 = false;
  hide2 = false;

  register() {
    alert(this.nom)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
