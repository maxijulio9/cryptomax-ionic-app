import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons,
   IonBackButton, IonContent, IonAvatar, IonCard, 
   IonCardHeader, IonCardTitle, IonCardContent, IonList,
   IonItem, IonLabel, IonNote, IonBadge, IonIcon, IonRefresher,
    IonRefresherContent, IonButton, IonImg, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {  profileService } from 'src/app/services/profile-service';
import { PhotosService } from 'src/app/services/photo-service';
// import { Preferences } from '@capacitor/preferences';


@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonFab, IonImg, IonButton, IonRefresherContent, IonRefresher,
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
    IonIcon, IonFabButton]
})
export class ProfilePage {

  private router = inject(Router);
  private userProfileService = inject(profileService);
  private photosService = inject(PhotosService);
  profileImage: string | null = null;


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
    // await Preferences.set({ key: 'profileImage', value: this.profileImage! });
    // const { value } = await Preferences.get({ key: 'profileImage' });
    //  this.profileImage = value;

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
  // async takePhoto() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Prompt, // te deja elegir entre cámara o galería
  //   });

  //   this.profileImage = image.dataUrl!;
  // }
  constructor() { 
    this.profileImage = this.photosService.photoprofile;
  } 

  async takePhoto() {
    const photo = await this.photosService.addPhotoToProfile();
    if (photo) {
      this.profileImage = photo;
    }
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

  goToMyTransactions() {
    this.router.navigate(['/my-cryptos']);
    console.log('Ir a mis transacciones');   
  }
  goToReports() {
    console.log('Ir a reportes');
  } 

  logout() {
    console.log('Cerrar sesión');
  }

  refreshPage(refresher: any) {
    //recargar los datos de la pagina
    this.ngOnInit();
    //detener el spinner del refresher
    refresher?.complete?.();
  } 
}
