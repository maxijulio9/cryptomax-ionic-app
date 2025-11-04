import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
   IonList, IonItem, IonLabel, IonBadge, IonAvatar, IonText, IonIcon, IonButton,
    IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/angular/standalone';
import { TransactionsService } from 'src/app/services/transaction-service';

@Component({
  standalone: true,
  selector: 'app-my-cryptos',
  templateUrl: './my-cryptos.page.html',
  styleUrls: ['./my-cryptos.page.scss'],
  imports: [IonItemOptions, IonItemOption, IonButton, IonIcon, 
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonBadge, IonAvatar, IonText, IonItemSliding
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

  removeTransaction(id: number) {
    this.txService.delete(id).subscribe({
      next: () => {
        this.cryptos = this.cryptos.filter(tx => tx.id !== id);
      } ,
      error: err => console.error('Error al eliminar transacción', err)
    });
  }   
}
