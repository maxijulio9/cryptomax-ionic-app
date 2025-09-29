import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonImg, IonCard, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-coin-card',
  templateUrl: './coin-card.component.html',
  styleUrls: ['./coin-card.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonImg, RouterLink],
})
export class CoinCardComponent  implements OnInit {

  @Input() name = '';
  @Input() image = '';
  @Input() routerLink: any[] | string = '';

  @Output() cardClick = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {}

}
