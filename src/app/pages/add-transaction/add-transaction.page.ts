import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

import { CriptoCoinGeckoApi } from 'src/app/services/cripto-coin-gecko-api';
import { ExchangesService } from 'src/app/services/exchange-service';
import { addOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transaction-service';
import { ModalController, IonicModule } from '@ionic/angular';
import { AddExchangeComponent } from 'src/app/components/add-exchange/add-exchange.component';
import { map, Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-add-crypto',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule, 
    IonicModule
  ]
})
export class AddTransactionPage implements OnInit {

  private coinApi = inject(CriptoCoinGeckoApi);
  private exchangesService = inject(ExchangesService);
  private fb = inject(FormBuilder);
  private toastCtrl = inject(ToastController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transactionsService = inject(TransactionsService);
  private modalCtrl = inject(ModalController);
  private cdr = inject(ChangeDetectorRef); 


  allCryptos: { id: string; symbol: string; name: string }[] = [];
  exchanges: string[] = [];

  showDateTimePicker = false;

  form = this.fb.group({
    symbol: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.0001)]],
    priceUsd: [null, [Validators.required, Validators.min(0.01)]],
    exchange: [''],
    date: [new Date().toISOString(), Validators.required],
    notes: ['']
  });

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

    this.loadExchanges().subscribe();
  }

  loadExchanges(): Observable<string[]> {
    return this.exchangesService.getAllExchanges().pipe(
      map(data => {
        this.exchanges = data.map(e => e.name);
        return this.exchanges;
      })
    );
  }

  async openExchangeModal() {
    const modal = await this.modalCtrl.create({
      component: AddExchangeComponent,
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        const newExchange = result.data;
        
        this.loadExchanges().subscribe({
          next: () => {
            this.form.patchValue({ exchange: newExchange.name });
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error al recargar exchanges:', err)
        });
      }
    });

    await modal.present();
  }

  onDateTimeChange(ev: any) {
    const newDateTimeValue = ev.detail.value;
    if (newDateTimeValue) {
      this.form.patchValue({ date: newDateTimeValue });
    }
    this.showDateTimePicker = false;
  }

  onSubmit() {
    if (this.form.valid) {
      const transaction = this.form.value;

      this.transactionsService.add(transaction as any).subscribe({
        next: async (res) => {
          console.log('Txn guardada:', res);
          const toast = await this.toastCtrl.create({
            message: 'Compra registrada correctamente',
            duration: 2500,
            color: 'success',
            position: 'bottom'
          });
          await toast.present();
          this.form.reset();
        },
        error: async (err) => {
          console.error('Error al guardar transacción', err);
          const toast = await this.toastCtrl.create({
            message: 'Error al guardar la transacción',
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

  goToTransactions() {
    this.router.navigate(['/my-cryptos']);
  }
}