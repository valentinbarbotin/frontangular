import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  produits = [
    {
      nom: 'nom',
      description: 'descdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdescdesc',
      prix: 50,
      img: 'https://s2.qwant.com/thumbr/0x380/d/d/977c289e1743913afd2def4212acd6d3c73399197f53b53464ad3b3ec8234e/Soccer-Ball.png?u=https%3A%2F%2Fwww.whistleblowingservice.com.au%2Fwp-content%2Fuploads%2F2020%2F01%2FSoccer-Ball.png&q=0&b=1&p=0&a=1'
    },
    {
      nom: 'nom',
      description: 'description',
      prix: 50,
      img: 'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/acd99988384037a1c18ea28743b913e1'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
