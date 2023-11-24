import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//Este import es para los servicios HTTP
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Angular material
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
//Cambia el idioma a español
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { RegistroMateriaScreenComponent } from './screens/registro-materia-screen/registro-materia-screen.component';
import { HomeMateriaScreenComponent } from './screens/home-materia-screen/home-materia-screen.component';
import { EliminarMateriaModalComponent } from './modals/eliminar-materia-modal/eliminar-materia-modal.component';


import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EditarMateriaModalComponent } from './modals/editar-materia-modal/editar-materia-modal.component';
import { ModificarMateriaModalComponent } from './modals/modificar-materia-modal/modificar-materia-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    EliminarUserModalComponent,
    EliminarMateriaModalComponent,
    HomeMateriaScreenComponent,
    RegistroMateriaScreenComponent,
    EliminarMateriaModalComponent,
    EditarMateriaModalComponent,
    ModificarMateriaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MtxDatetimepickerModule,
    NgxMaterialTimepickerModule
    
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
