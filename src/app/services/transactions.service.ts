import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
  ) { }
  public esquemaTransferencia() {
    return {
      'accountId': '',
      'targetAccountId': '',
      'ammount': 0,
    };
  }


  // Servicio para realizar una transferencia
  public realizarTransferencia(data: any): Observable<any> {
    data.ammount = Number(data.ammount)
    console.log(data)
    console.log('Enviando solicitud de transferencia a:', `${environment.url_api}/api/transactions/`);
    return this.http.post<any>(`${environment.url_api}/api/transactions/`, data, httpOptions);
  }
}