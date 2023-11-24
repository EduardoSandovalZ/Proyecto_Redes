import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  // Servicio para realizar la transferencia
  public transferirDinero(data: any): Observable<any> {
    console.log('Enviando solicitud a:', `${environment.url_api}/api/transactions/`);
    return this.http.post<any>(`${environment.url_api}/api/transactions/`, data, httpOptions);
  }
}
