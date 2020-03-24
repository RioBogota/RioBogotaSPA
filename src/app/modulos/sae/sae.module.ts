import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaExpedientesComponent } from '../../sae/consulta-expedientes/consulta-expedientes.component';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTableModule,
    RouterModule.forChild([
      { path: 'sae/consulta', component: ConsultaExpedientesComponent }
    ])
  ],
  declarations: [ConsultaExpedientesComponent]
})
export class SaeModule { }
