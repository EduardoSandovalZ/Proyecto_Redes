import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit, AfterViewInit {
  // Variables del componente registro
  @ViewChild('telefonoInput') telefonoInput?: ElementRef;
  public user: any = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmar_password: '',
    role: '',
    telefono: '', // Cambiando 'phone' a 'telefono'
  };
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  public errors: any = {};
  // public idUser: number = 0;
  constructor(
    private location: Location,
    private usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();
    // Imprimir datos en consola
    console.log("User: ", this.user);
    
  }

  ngAfterViewInit() {
    if (this.telefonoInput) {
      // Acceder al elemento solo si está definido
    }
  }

  public regresar() {
    this.location.back();
  }
  

  // Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  formatearTelefono() {
    if (this.telefonoInput && this.telefonoInput.nativeElement && this.telefonoInput.nativeElement.value) {
      const valor = this.telefonoInput.nativeElement.value;
      const valorNumerico = valor.replace(/\D/g, '');
      const formato = "(000) 000-0000";
      let valorFormateado = "";
      let j = 0;
      for (let i = 0; i < formato.length; i++) {
        if (formato[i] === '0') {
          valorFormateado += valorNumerico[j] || ''; 
          j++;
        } else {
          valorFormateado += formato[i];
        }
      }
      this.user.phone = valorFormateado;
    } else {
      console.error('this.telefonoInput, this.telefonoInput.nativeElement o su valor es undefined');
    }
  }

  public registrar(): void {
    console.log('Registrando usuario:', this.user); // Agregamos este log
    this.errors = this.usuariosService.validarUsuario(this.user, false);
  
    if (Object.keys(this.errors).length === 0) {
      this.usuariosService.registrarUsuario(this.user).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response); // Agregamos este log
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        },
        (error) => {
          console.error('Error al registrar usuario:', error); // Agregamos este log
          alert("No se pudo registrar usuario");
        }
      );
    }
  }
  
  
}
