import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  public type: String = "password";
  public email: String = "";
  public password: String = "";

  public errors:any = {};

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    // Validar
    this.errors = this.facadeService.validarLogin(this.email, this.password);
    
    if (!$.isEmptyObject(this.errors)) {
        // Mostrar mensajes de error u otras acciones necesarias
        return;
    }
    
    // Si pasa la validación, intentar iniciar sesión
    this.facadeService.login(this.email, this.password).subscribe(
        (response) => {
            this.facadeService.saveUserData(response);
            this.router.navigate(["home"]);
        },
        (error) => {
            alert("No se pudo iniciar sesión");
        }
    );
  }


  public registrar(){

    this.router.navigate(["registro"]);
  }

  public showPassword(){
    if(this.type == "password"){
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }
}
