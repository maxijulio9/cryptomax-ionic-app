import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExchangesService } from 'src/app/services/exchange-service';
import { Exchange } from 'src/app/models/exchange';
import { IonLabel, IonInput, IonHeader, IonContent, IonItem, IonButton, IonFooter, IonTitle, IonToolbar, IonButtons } from "@ionic/angular/standalone";


@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  imports: [IonButtons, IonToolbar, IonTitle, IonFooter, IonButton, IonItem, IonContent, IonInput,
    ReactiveFormsModule, IonLabel, IonHeader],
})
export class AddExchangeComponent {

  form: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private exchangesService: ExchangesService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      typeWallet: [''],
    });
  }

  save() {
    if (this.form.invalid) return;

    const newExchange: Exchange = this.form.value;

    this.exchangesService.add(newExchange).subscribe({
      next: (data) => this.modalCtrl.dismiss({ data }),
      error: (err) => console.error('Error al guardar exchange:', err),
    });
    
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
