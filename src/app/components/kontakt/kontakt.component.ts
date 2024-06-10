import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {

  contactInfo = {
    phone: '+381 11 123 4567',
    email: 'info@sportbasic.com',
    address: 'Bulevar Kralja Aleksandra 54, 11000 Beograd, Srbija'
  };

  stores = [
    {
      city: 'Beograd',
      address: 'Bulevar Kralja Aleksandra 54, 11000 Beograd'
    },
    {
      city: 'Novi Sad',
      address: 'Trg Slobode 5, 21000 Novi Sad'
    },
    {
      city: 'Niš',
      address: 'Obrenovićeva 10, 18000 Niš'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
