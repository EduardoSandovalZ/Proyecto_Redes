import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transferir-screen',
  templateUrl: './transferir-screen.component.html',
  styleUrls: ['./transferir-screen.component.scss']
})
export class TransferirScreenComponent {
  public accountId: string = "";
  public targetAccountId: string = "";
  public ammount: number = 0;
  public errors: any = {};

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    private transactionsService: TransactionsService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    // Aquí puedes cargar la información de las cuentas
  }
  public regresar() {
    this.location.back();
  }
  public transferir(): void {
    this.errors = {};

    if (!this.accountId.trim()) {
      this.errors.accountId = "Número de cuenta de origen obligatorio";
    }

    if (!this.targetAccountId.trim()) {
      this.errors.targetAccountId = "Número de cuenta de destino obligatorio";
    }

    if (this.ammount <= 0) {
      this.errors.ammount = "El monto debe ser mayor que cero";
    }

    if (Object.keys(this.errors).length === 0) {
      // Realizar la transferencia
      this.transactionsService.transferirDinero({
        accountId: this.accountId,
        targetAccountId: this.targetAccountId,
        ammount: this.ammount
      }).subscribe(
        (response) => {
          // Manejar la respuesta del servidor si es necesario
          alert("Transferencia exitosa");
          this.router.navigate(["home"]);
        },
        (error) => {
          console.error('Error al transferir dinero:', error);
          alert("No se pudo realizar la transferencia");
        }
      );
    }
  }

}
