import { Component, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import {  profileService } from 'src/app/services/profile-service';

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
    IonIcon,
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

  private router = inject(Router);
  private userProfileService = inject(profileService);

  // user = {
  //   name: 'Maximiliano',
  //   lastName: 'Julio',
  //   email: 'maxi.crypto@example.com',
  //   country: 'Argentina',
  //   dni: '43010166',
  //   joinDate: '2024',
  //   level: 'Verificado',
  //   avatar: 'assets/coins/user.png'
  // };

   user: any = null; 

  ngOnInit() {
    // this.userProfileService.getProfile().subscribe({
    //   next: data => {
    //     this.user = {
    //       name: data.name,
    //       lastName: data.lastName,
    //       email: data.email,
    //       country: data.country,
    //       dni: data.dni,
    //       joinDate: new Date(data.memberSince).getFullYear(),
    //       level: data.accountLevel === 'verified' ? 'Verificado' : 'Básico',
    //       avatar: data.avatarUrl || 'assets/coins/user.png'
    //     };
    //   },
    //   error: err => console.error('Error al obtener el perfil', err)
    // });
    this.userProfileService.getProfile().subscribe({
      next: data => {
        this.user = {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          dni: data.dni,
          joinDate: new Date(data.memberSince).getFullYear(),
          level: data.accountLevel === 'verified' ? 'Verificado' : 'Básico',
          avatar: data.avatarUrl || 'assets/coins/user.png'
        };
      },
      error: err => console.error('Error al obtener el perfil', err)
    }); 


  }


  goToEditProfile() {
    this.router.navigate(['/edit-profile'], {
      state: { profile: this.user }
     });
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
