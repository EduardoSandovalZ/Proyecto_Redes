import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-modificar-materia-modal',
  templateUrl: './modificar-materia-modal.component.html',
  styleUrls: ['./modificar-materia-modal.component.scss']
})
export class ModificarMateriaModalComponent {
  constructor(
    private materiaServices: MateriaService, 
    private dialogRef: MatDialogRef<ModificarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit(): void {
    console.log("Materia id:", this.data.id);
  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  public modificarMateria(){
    this.materiaServices.getMateriaByID(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close({isDelete:true});
      },(error)=>{
        alert("Prueba "+ error);
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
