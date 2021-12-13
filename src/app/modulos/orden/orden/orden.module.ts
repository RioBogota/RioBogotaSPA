import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaComponent } from '../../../orden/consulta/encuesta/encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PreguntaComponent } from '../../../orden/consulta/pregunta/pregunta/pregunta.component';
import { ConsultaComponent } from '../../../orden/respuesta/consulta/consulta.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraficoComponent } from '../../../orden/consulta/grafico/grafico.component';


@NgModule({
  declarations: [EncuestaComponent, PreguntaComponent, ConsultaComponent, GraficoComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    RouterModule.forChild([
      { path: 'orden/formulario', component: EncuestaComponent },
      { path: 'orden/respuestas', component: ConsultaComponent },
      { path: 'orden/grafico', component: GraficoComponent }
    ])
  ]
})
export class OrdenModule { }
