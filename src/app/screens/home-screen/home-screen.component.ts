import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, AfterViewInit {
  public token: string = "";
  listaCuentas: DatosCuenta={BankAccount:[]};
  userId: string = '';
  errors: any = {};

  displayedColumns: string[] = ['uid', 'balance'];
  dataSource = new MatTableDataSource<DatosCuenta>(this.listaCuentas.BankAccount);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private facadeService: FacadeService,
    private usuariosService: UsuariosService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    // Validar que haya inicio de sesión
    // Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if (this.token == "") {
      this.router.navigate([""]);
    }
    interface JwtPayload {
      uid: string;
      role: string;
      iat: number;
      exp: number;
    }
    const jwt_payload: JwtPayload = jwtDecode(this.token);
    this.userId = jwt_payload.uid;
    console.log(this.userId)
    // Mandar a ejecutar la función
    this.obtenerCuentasUsuario(this.userId);
    //aqui fue donde le movi
    this.initPaginator();
    
  }

  obtenerCuentasUsuario(userId: string) {
    this.usuariosService.obtenerCuentasUsuario(userId).subscribe(
      (cuentas) => {
        console.log(cuentas)
        this.listaCuentas = cuentas;
        console.log(this.listaCuentas)
        this.dataSource.data = this.listaCuentas.BankAccount;
        console.log(this.dataSource.data)
      },
      (error) => {
        console.error('Error al obtener cuentas de usuario:', error);
      }
    );
  }

  public crearCuentaBanco() {
    if (this.userId) {
      console.log(this.userId)
      this.usuariosService.crearCuentaBanco(this.userId).subscribe(
        (response) => {
          // Maneja la respuesta del servidor, puedes mostrar un mensaje de éxito u otra acción necesaria
          console.log('Cuenta de banco creada exitosamente:', response);
          alert("Cuenta de banco creada exitosamente");
          this.router.navigate(["/"]);
        },
        (error) => {
          // Maneja los errores, puedes mostrar un mensaje de error o tomar la acción adecuada
          console.error('Error al crear la cuenta de banco:', error);
          alert("Error al crear la cuenta de banco");
        }
      );
    } else {
      // Maneja el caso cuando el userId no está disponible
      console.log(this,this.userId)
      console.error('UserId no disponible para crear la cuenta de banco.');
    }
  }

  public realizarTransferencia() {
    // Navega a la pantalla "transferir-screen"
    this.router.navigate(['/transferir']);
  }

  public retirarDinero(){
    

  }
  


 //Para paginacion
  //Paginador para Agentes
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }


  // Obtener lista de usuarios
  

  // Cerrar sesión
  public logout() {
    this.facadeService.logout().subscribe(
      (response) => {
        this.facadeService.destroyUser();
        // Navega al login
        this.router.navigate(["/"]);
      }, (error) => {
        console.error(error);
      }
    );
  }
  irARegistroMateria(): void {
    this.router.navigate(['/registro-materia']);
  }
  irAListaMaterias(): void {
    this.router.navigate(['/home-materia-screen']);
  }

  // Funcion para editar
  public goEditar(idUser: number) {
    this.router.navigate(["registro/"+idUser]);

  }

  // Función para eliminar
  public delete(idUser: number) {
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser},
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Usuario eliminado");
        window.location.reload();
      }else{
        console.log("No se eliminó el usuario");
        //alert("No se eliminó el usuario");
      }
    });

  }

}

// Esto va fuera de la llave que cierra la clase
export interface DatosUsuario {
  id: number,
  name: string;
  lastname: string;
  email: string;
  phone: string,
  role: string
}

export interface DatosCuenta {
  BankAccount:Array<any>;
}

​​​
uid: "65604a5c5669d1a2945b8e94"
​​​
updatedAt: "2023-11-24T09:00:23.284Z"
​​​
userId: "65600ef35669d1a2945b8e91"