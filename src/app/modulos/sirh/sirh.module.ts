import { ConsultaComponent } from './../../sirh/consulta/consulta.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      { path: 'sirh', component: ConsultaComponent }
    ])
  ]
})
export class SirhModule { }
