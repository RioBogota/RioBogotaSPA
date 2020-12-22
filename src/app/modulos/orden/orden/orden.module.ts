import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaComponent } from '../../../orden/consulta/encuesta/encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PreguntaComponent } from '../../../orden/consulta/pregunta/pregunta/pregunta.component';
import { ConsultaComponent } from '../../../orden/respuesta/consulta/consulta.component';
import { MatSelectModule } from '@angular/material';



@NgModule({
  declarations: [EncuestaComponent, PreguntaComponent, ConsultaComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild([
      { path: 'orden/formulario', component: EncuestaComponent },
      { path: 'orden/respuestas', component: ConsultaComponent }
    ])
  ]
})
export class OrdenModule { }
