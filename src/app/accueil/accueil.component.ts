import { Component, OnInit } from '@angular/core';
import { RESTService } from '../services/rest.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  
  makeGET() {
    console.log("requete go")

    this.RESTService.GET('test').subscribe(
      response => {
        console.log(response)
        alert(response)
      },
      error => {
        console.log(error.error.error)
        alert(error.error.error)
      }
    )

  }

  getToken() {
    return this.RESTService.token;
  }
  constructor(
    private RESTService: RESTService
  ) { }

  ngOnInit(): void {
  }

}
