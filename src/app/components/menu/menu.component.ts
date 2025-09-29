import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonItem, IonList, IonContent, IonTitle, IonHeader, IonMenu, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
   encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IonToolbar, IonHeader, IonTitle, IonContent, IonList, IonItem, IonMenu],
})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
