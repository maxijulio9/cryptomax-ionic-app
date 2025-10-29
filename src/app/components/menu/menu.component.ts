import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonItem, IonList, IonContent, IonTitle, IonHeader, IonMenu, IonToolbar, IonRouterOutlet, IonApp, IonMenuToggle, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
   encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IonIcon, IonApp, IonRouterOutlet,
     IonToolbar, IonHeader, IonTitle,
      IonContent, IonList, IonItem, IonMenu, IonMenuToggle, RouterLink],
})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}


