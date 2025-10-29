import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonBadge, IonAvatar, IonText } from '@ionic/angular/standalone';
import { TransactionsService } from 'src/app/services/transaction-service';

@Component({
  standalone: true,
  selector: 'app-my-cryptos',
  templateUrl: './my-cryptos.page.html',
  styleUrls: ['./my-cryptos.page.scss'],
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonBadge, IonAvatar, IonText
  ]
})

export class MyCryptosPage implements OnInit {


  private txService = inject(TransactionsService);
  cryptos: any[] = [];

  ngOnInit() {
    this.txService.getAll().subscribe({
      next: data => {
        this.cryptos = data.map(tx => ({
          ...tx,
          total: tx.amount * tx.priceUsd,
           notes: tx.notes || 'Sin notas'
        }));
      },
      error: err => console.error('Error al obtener transacciones', err)
    });
  }
}
