import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaComponent } from '../../../orden/consulta/encuesta/encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PreguntaComponent } from '../../../orden/consulta/pregunta/pregunta/pregunta.component';



@NgModule({
  declarations: [EncuestaComponent, PreguntaComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'orden/formulario', component: EncuestaComponent }
    ])
  ]
})
export class OrdenModule { }
