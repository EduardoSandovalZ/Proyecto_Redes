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
export class UsuariosService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService,
  ) { }

  public esquemaUser(){
    return {
      'name': '',
      'lastname': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'phone':'',
      'role': '',
    }
  }

  //Validación para el formulario
  public validarUsuario(data: any, editar: boolean){
    console.log("Validando user... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["name"])){
      error["name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["lastname"])){
      error["lastname"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    //Checa la bandera de editar si es TRUE
    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }
  
      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    

    if(!this.validatorService.required(data["role"])){
      error["role"] = this.errorService.required;
    }

    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarUsuario(data: any): Observable<any> {
    console.log('Enviando solicitud a:', `${environment.url_api}/api/usuarios/`); // Agregamos este log
    return this.http.post<any>(`${environment.url_api}/api/usuarios/`, data, httpOptions);
  }
  //Servicio para obtener la lista de usuarios
  public obtenerListaUsers (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-users/`, {headers});
  }
  public getUserByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/users/?id=${idUser}`,httpOptions); 
  }
  public realizarTransferencia(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/api/transactions/`, data, httpOptions);
  }
  public crearCuentaBanco(userId: string): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'x-token': token});
    return this.http.post<any>(`${environment.url_api}/api/bankAccount`, { userId }, {headers});
  }
  public obtenerCuentaBanco(userId: string): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'x-token': token});
    return this.http.post<any>(`${environment.url_api}/api/bankAccount/${userId}`, { userId }, {headers});
  }
  
  
  
}
