import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-eliminar-materia-modal',
  templateUrl: './eliminar-materia-modal.component.html',
  styleUrls: ['./eliminar-materia-modal.component.scss']
})
export class EliminarMateriaModalComponent {

  constructor(
    private materiaServices: MateriaService,
    private dialogRef: MatDialogRef<EliminarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("Materia id:", this.data.id);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarMateria(){
    this.materiaServices.eliminarMateria(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close({isDelete:true});
      },(error)=>{
        alert("Materia no eliminada "+ error);
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
