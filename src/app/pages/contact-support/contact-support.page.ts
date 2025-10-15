import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonSelect, IonSelectOption,
  IonInput, IonTextarea, IonButton, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-contact-support',
  templateUrl: './contact-support.page.html',
  styleUrls: ['./contact-support.page.scss'],
  imports: [IonText, 
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonItem, IonLabel, IonSelect, IonSelectOption,
    IonInput, IonTextarea, IonButton
  ]
})
export class ContactSupportPage {
  form = this.fb.group({
    tipo: [[], Validators.required],
    resumen: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Consulta enviada:', this.form.value);
      alert('Tu consulta fue enviada con éxito ✅');
      this.router.navigate(['/about']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/about']);
  }
}
