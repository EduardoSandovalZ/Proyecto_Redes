import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { EditarMateriaModalComponent } from 'src/app/modals/editar-materia-modal/editar-materia-modal.component';
import { ModificarMateriaModalComponent } from 'src/app/modals/modificar-materia-modal/modificar-materia-modal.component';
@Component({
  selector: 'app-home-materia-screen',
  templateUrl: './home-materia-screen.component.html',
  styleUrls: ['./home-materia-screen.component.scss']
})
export class HomeMateriaScreenComponent implements OnInit, AfterViewInit {
  public token: string = "";
  public listaMaterias: DatosMateria[] = [];

  displayedColumns: string[] = ['nrc', 'nombre', 'seccion', 'dias', 'hora_inicio', 'hora_final', 'salon', 'programa_educativo', 'editar', 'eliminar'];

  dataSource = new MatTableDataSource<any>(this.listaMaterias);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private materiaService: MateriaService,
    private router: Router,
    private location: Location,
    private http: HttpClient, 
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.token = this.facadeService.getSessionToken();
    this.obtenerMaterias();

    if (this.token === "") {
      this.router.navigate([""]);
    }

    this.obtenerMaterias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  public obtenerMaterias() {
    this.materiaService.obtenerListaMaterias().subscribe(
      (response) => {
        this.listaMaterias = response;
        this.convertirHorasADate(this.listaMaterias);  // Aquí se realiza la conversión
        this.dataSource.data = this.listaMaterias;
      },
      (error) => {
        alert("No se pudo obtener la lista de materias");
      }
    );
  }
  convertirHorasADate(listaMaterias: DatosMateria[]) {
    listaMaterias.forEach(materia => {
      materia.hora_inicio = new Date(`1970-01-01T${materia.hora_inicio}`);
      materia.hora_final = new Date(`1970-01-01T${materia.hora_final}`);
    });
  }
  
  // public obtenerMaterias() {
    // this.materiaService.obtenerListaMaterias().subscribe(
      // (response) => {
        // this.listaMaterias = response;
        // this.dataSource.data = this.listaMaterias;
      // },
      // (error) => {
        // alert("No se pudo obtener la lista de materias");
      // }
    // );
  // }

  regresar(): void {
    this.location.back();
  }

  // goEditar((idMateria: number)){

  // }
  // delete((idMateria: number)){

  // }
  public goEditarMateria(idMateria: number) {
    const dialogRef = this.dialog.open(ModificarMateriaModalComponent,{
      data: {id: idMateria},
      height: '268px',
      width: '328px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["registro-materia/"+idMateria]);
      if(result && result.isEdited){
        console.log("Materia Editada");
        window.location.reload();
      }else{
        
        console.log("No se edito la materia");
        //alert("No se eliminó el usuario");
      }
    });
    

  }

  public deleteMateria(idMateria: number) {
    const dialogRef = this.dialog.open(EliminarMateriaModalComponent,{
      data: {id: idMateria},
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminado");
        window.location.reload();
      }else{
        console.log("No se eliminó la materia");
        //alert("No se eliminó el usuario");
      }
    });

  }
  
}
export interface DatosMateria {
  id: number,
  nrc: number;
  nombre: string;
  seccion: number;
  dias: string;
  hora_inicio: Date;
  hora_final: Date;
  salon: string;
  programa_educativo: string;
}
