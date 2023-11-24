
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { HttpHeaders } from '@angular/common/http';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import {NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Location, formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { EditarMateriaModalComponent } from 'src/app/modals/editar-materia-modal/editar-materia-modal.component';


declare var $: any;

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss']
})
export class RegistroMateriaScreenComponent implements OnInit {
  element: any;
  public token: string = "";
  editar: boolean = false;
  materia: any = {};  // Asegúrate de que esta estructura coincida con tu esquema en MateriaService
  public errors: any = {};
  formulario!: FormGroup;
  public idMateria: number = 0;
  @ViewChild('picker')
  picker!: NgxMaterialTimepickerComponent;
  constructor(
    private location: Location,
    private materiaService: MateriaService,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.materia.programa_educativo = '';
    this.token = this.facadeService.getSessionToken();
    this.materia = this.materiaService.esquemaMateria();
    // Verificar la existencia del token
    if (this.token === "") {
      // Redirigir al inicio de sesión si no hay token
      this.router.navigate([""]);
    }
    // Verificar si es una edición
    console.log("Materia: ", this.materia);
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaPorId();
    }
    
  
  }

  onHoraInicioSet(event: any): void {
    // Aquí, event es la hora seleccionada en el formato 'HH:mm:ss'
    this.materia.hora_inicio = event;
  }
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      // Define aquí las propiedades del formulario y las validaciones necesarias
      programa_educativo: ['', Validators.required],
      // Agrega más propiedades según tus necesidades
    });
  }

  

  regresar(): void {
    this.location.back();
  }
  public obtenerMateriaPorId(): void {
    this.token = this.facadeService.getSessionToken();
    this.materia = this.materiaService.esquemaMateria();
    
    this.materiaService.getMateriaByID(this.idMateria).subscribe(
      (response) => {
        this.materia = response;
        // Asegúrate de ajustar las propiedades según la estructura de tu entidad Materia
        this.materia.nombre = response.nombre;
        this.materia.salon = response.salon;
        this.materia.dias = response.dias;
        this.materia.hora_inicio = response.hora_inicio.split(':').splice(0,2).join(':');
        this.materia.hora_final = response.hora_final.split(':').splice(0,2).join(':');
        this.materia.programa_educativo = response.programa_educativo;
        // ... Agrega otras propiedades
  
        console.log("Datos de la materia: ", this.materia);
      },
      (error) => {
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }
  setElementData(data: any) {
    this.element = data;
  }
  
  // public goEditarMateria(id: any) {
  //   const dialogRef = this.dialog.open(EditarMateriaModalComponent,{
  //     data: {id: id},
  //     height: '268px',
  //     width: '328px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.router.navigate(["registro-materia/"+id]);
  //     if(result && result.isEdited){
  //       console.log("Materia Editada");
  //       window.location.reload();
  //     }else{
        
  //       console.log("No se edito la materia");
  //       //alert("No se eliminó el usuario");
  //     }
  //   });
    

  // }
  public goEditarMateria(): boolean {
    
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");
    
    // Mandar a registrar los datos
    this.materiaService.editarMateria(this.materia).subscribe(
      (response) => {
        alert("Usuario editado correctamente");
        console.log("Usuario editado: ", response);
        // Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo editar usuario");
      }
    );
  
    // Devolver true si todo está bien
    return true;

  }

  formatearHora(hora: string): string {
    const date = new Date();
    const [hours, minutes] = hora.split(':');
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return formatDate(date, 'hh:mm a', 'en-US');
  }


  registrarMateria(): void {
    if (!this.materia.programa_educativo) {
      alert('Por favor, selecciona un programa educativo');
      return;
    }
    // Asegúrate de incluir el token en los encabezados
    var headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token 
    });

    // Lógica para registrar la materia
    this.materiaService.registrarMateria(this.materia, headers).subscribe(
      (response) => {
        alert("Materia registrada correctamente");
        console.log("Materia registrada: ", response);
        // Si se registró, entonces mandar al home o a donde necesites
        this.router.navigate(["home"]);
      },
      (error) => {
        alert("No se pudo registrar la materia");
      }
    );
  }
  
}