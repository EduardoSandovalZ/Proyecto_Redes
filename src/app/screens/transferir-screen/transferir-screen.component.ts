import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { HttpHeaders } from '@angular/common/http';
import { Location, formatDate } from '@angular/common';

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


  public regresar(){

  }
  public transferir(){
    
  }

}
