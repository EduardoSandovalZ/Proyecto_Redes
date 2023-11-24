import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { HttpHeaders } from '@angular/common/http';
import { Location, formatDate } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TransactionsService } from 'src/app/services/transactions.service';


@Component({
  selector: 'app-transferir-screen',
  templateUrl: './transferir-screen.component.html',
  styleUrls: ['./transferir-screen.component.scss']
})
export class TransferirScreenComponent {
  // Declara las propiedades necesarias
  accountId: string = '';
  targetAccountId: string = '';
  ammount: number = 0;
  errors: any = {};

  constructor(
    private location: Location,
    private usuariosService: UsuariosService,
    private transactionsService: TransactionsService ,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public regresar() {
    this.location.back(); // Regresa a la pantalla anterior
  }
  public transferir() {
    // Verifica si los campos obligatorios están llenos
    if (!this.accountId || !this.targetAccountId || this.ammount <= 0) {
      // Puedes mostrar un mensaje de error o tomar la acción adecuada
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Crea el objeto de transferencia
    const transferData = {
      targetAccountId: this.targetAccountId,
      accountId: this.accountId,
      ammount: this.ammount
    };

    // Llama a la función para realizar la transferencia
    this.transactionsService.realizarTransferencia(transferData).subscribe(
      (response) => {
        // Procesa la respuesta del servidor, puedes mostrar un mensaje de éxito u otra acción necesaria
        console.log('Transferencia exitosa:', response);
      },
      (error) => {
        // Maneja los errores, puedes mostrar un mensaje de error o tomar la acción adecuada
        console.error('Error al realizar la transferencia:', error);
      }
    );
  }
}


