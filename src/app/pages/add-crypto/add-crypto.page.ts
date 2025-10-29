import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonDatetime, IonButton, IonTextarea, IonIcon, IonModal, IonToast
} from '@ionic/angular/standalone';
import { CriptoCoinGeckoApi } from 'src/app/services/cripto-coin-gecko-api';
import { ExchangesService } from 'src/app/services/exchange-service';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transaction-service';

@Component({
  standalone: true,
  selector: 'app-add-crypto',
  templateUrl: './add-crypto.page.html',
  styleUrls: ['./add-crypto.page.scss'],
  imports: [
    IonModal,
    IonToast,
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonDatetime, IonButton, IonTextarea, IonIcon, FormsModule
  ]
})
export class AddCryptoPage implements OnInit {

  private coinApi = inject(CriptoCoinGeckoApi);
  private exchangesService = inject(ExchangesService);
  private fb = inject(FormBuilder);
  private toastCtrl = inject(ToastController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transactionsService = inject(TransactionsService);



  allCryptos: { id: string; symbol: string; name: string }[] = [];
  exchanges: string[] = [];

  form = this.fb.group({
    symbol: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.0001)]],
    priceUsd: [null, [Validators.required, Validators.min(0.01)]],
    exchange: [''],
    date: [new Date().toISOString(), Validators.required],
    notes: ['']
  });

  exchangeForm = this.fb.group({
    name: ['', Validators.required]
  });

  isExchangeModalOpen = false;

  constructor() {
    addIcons({ addOutline });
  }

  ngOnInit() {
    const symbolParam = this.route.snapshot.queryParamMap.get('symbol');
    if (symbolParam) {
      this.form.patchValue({ symbol: symbolParam.toUpperCase() });
    }

    this.coinApi.getAllCryptos(150).subscribe({
      next: data => this.allCryptos = data.sort((a, b) => a.name.localeCompare(b.name)),
      error: err => console.error('Error al obtener criptos', err)
    });

    this.exchangesService.getAllExchanges().subscribe({
      next: data => this.exchanges = data.map(e => e.name),
      error: err => console.error('Error al obtener exchanges', err)
    });
  }

  openExchangeModal() {
    this.exchangeForm.reset();
    this.isExchangeModalOpen = true;
  }

  closeExchangeModal() {
    this.isExchangeModalOpen = false;
  }

  saveExchange() {
    const nuevo = (this.exchangeForm.value.name ?? '').trim();
    console.log("nuevo:", nuevo);
    if (!nuevo || this.exchangeForm.invalid) return;

    this.exchangesService.add({ name: nuevo }).subscribe({
      next: async (res) => {
        this.exchanges.push(res.name);
        this.form.patchValue({ exchange: res.name });

        const toast = await this.toastCtrl.create({
          message: `Exchange "${res.name}" agregado correctamente`,
          duration: 2500,
          color: 'success',
          position: 'bottom'
        });
        await toast.present();

        this.closeExchangeModal();
        this.exchangeForm.reset();
      },
      error: async (err) => {
        console.error('Error al agregar exchange', err);
        const toast = await this.toastCtrl.create({
          message: 'Error al agregar el exchange ',
          duration: 2500,
          color: 'danger',
          position: 'bottom'
        });
        await toast.present();
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const transaction = this.form.value;

      this.transactionsService.add(transaction as any).subscribe({
        next: async (res) => {
          console.log('🟢 Transacción guardada:', res);
          const toast = await this.toastCtrl.create({
            message: 'Compra registrada correctamente ',
            duration: 2500,
            color: 'success',
            position: 'middle'
          });
          await toast.present();

          this.form.reset();
        },
        error: async (err) => {
          console.error('Error al guardar transacción', err);
          const toast = await this.toastCtrl.create({
            message: 'Error al guardar la transacción ',
            duration: 2500,
            color: 'danger',
            position: 'bottom'
          });
          await toast.present();
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  showDatePicker = false;
  showTimePicker = false;

  onDateConfirm(ev: any) {
    const newDate = new Date(ev.detail.value);
    const current = new Date(this.form.value.date || new Date());
    current.setFullYear(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    this.form.patchValue({ date: current.toISOString() });
    this.showDatePicker = false;
  }

  onTimeConfirm(ev: any) {
    const newTime = new Date(ev.detail.value);
    const current = new Date(this.form.value.date || new Date());
    current.setHours(newTime.getHours(), newTime.getMinutes());
    this.form.patchValue({ date: current.toISOString() });
    this.showTimePicker = false;
  }
  goToTransactions() {
    this.router.navigate(['/my-cryptos']);
  }
  


}
