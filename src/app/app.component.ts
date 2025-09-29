import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonItem, IonContent, IonList, IonToolbar, IonTitle, IonHeader, IonMenu, IonSplitPane } from '@ionic/angular/standalone';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonSplitPane, IonHeader, IonTitle, IonToolbar, IonList, IonContent, IonItem, IonApp, IonRouterOutlet, IonMenu, MenuComponent],
})
export class AppComponent {
  constructor() {}
}
