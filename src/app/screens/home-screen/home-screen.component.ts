import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';


@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, AfterViewInit {
  public token: string = "";
  public lista_usuarios: any[] = [];

  displayedColumns: string[] = ['nombre', 'email','phone','role', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);

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
    // Mandar a ejecutar la función
    this.obtenerUsuarios();
    //aqui fue donde le movi
    this.initPaginator();
  }

  // Para paginacion
  // Paginador para Agentes

  /**
   * public initPaginator() {
    this.dataSource.paginator = this.paginator;
    // Modificar etiquetas del paginador a español
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
  }
   * 
   * 
   */
  


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
  public obtenerUsuarios() {
    this.usuariosService.obtenerListaUsers().subscribe(
      (response) => {
        this.lista_usuarios = response;
        console.log("Lista users: ", this.lista_usuarios);
        if (this.lista_usuarios.length > 0) {
          // Agregar datos del nombre e email
          this.lista_usuarios.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_usuarios);

          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);
        }
      }, (error) => {
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }

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
  first_name: string;
  last_name: string;
  email: string;
  phone: string,
  role: string
}
