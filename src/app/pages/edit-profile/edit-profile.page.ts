import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader,IonInput, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonList, IonBackButton, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { profileService } from 'src/app/services/profile-service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonToast, IonBackButton, IonList, IonLabel, IonItem, IonButton,
     IonButtons, IonContent, IonHeader, IonTitle, IonInput,
      IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, CommonModule]
})
export class EditProfilePage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private profileService = inject(profileService);

  isToastOpen = false;
  toastMessage = '';
  toastColor = 'success' ;

  formEditProfile= this.fb.group({
    id: [''],
    name: ['', Validators.required ],
    lastName: ['', Validators.required ],
    email: ['', [Validators.required, Validators.email] ],
    dni: [''],
    country: ['', Validators.required ]
  });

    


  constructor() { }

  ngOnInit() {
    const navigation = this.router.currentNavigation();
    const state = navigation?.extras?.state as { profile?: any };

    if (state?.profile) {
      this.formEditProfile.patchValue(state.profile);
    }
  }

  saveProfile() {
    if (this.formEditProfile.valid) {

      // Safely map form values to a Profile, ensuring required string fields are non-null/defined
      const formValue = this.formEditProfile.value;
      const profileData: Profile = {
        id: formValue.id ?? '',
        name: formValue.name ?? '',
        lastName: formValue.lastName ?? '',
        email: formValue.email ?? '',
        dni: formValue.dni ?? '',
        country: formValue.country ?? ''
      };

      this.profileService.editProfile(profileData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.isToastOpen = true;
          this.toastMessage = 'Profile updated successfully!';
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
      console.log('Profile data to save:', profileData);

    } else {
      console.log('Form is invalid');
    }
  }

}
