import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonBadge,
  IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonBadge,
    IonIcon
  ]
})
export class ProfilePage {
  user = {
    name: 'Maximiliano Julio',
    email: 'maxi.crypto@example.com',
    country: 'Argentina',
    joinDate: '2024',
    level: 'Verificado',
    avatar: 'assets/coins/user.png'
  };

  goToEditProfile() {
    console.log('Editar perfil');
  }

  goToSecurity() {
    console.log('Ir a seguridad');
  }

  goToWallets() {
    console.log('Ir a wallets');
  }

  logout() {
    console.log('Cerrar sesión');
  }
}
