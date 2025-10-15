import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonMenuButton, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonIcon, IonButton, 
    IonButtons, IonCard, IonCardTitle, 
    IonCardSubtitle, IonCardContent,
     IonCardHeader, IonItem, IonContent, 
     IonHeader, IonTitle, IonToolbar, 
     CommonModule, FormsModule, IonMenuButton ]
})
export class AboutPage implements OnInit {
  
  private router = inject(Router);


  constructor() { }

  ngOnInit() {
  }

  contactSupport() {
    
    console.log('Contactando soóprter');
    //lo mandomo al form
    this.router.navigate(['/contact-support']);
    
  }

}
