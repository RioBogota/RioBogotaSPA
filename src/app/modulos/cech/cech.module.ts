import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionGeneralComponent } from '../../cech/informacion-general/informacion-general.component';
import { DocumentosComponent } from '../../cech/documentos/documentos.component';
import { RouterModule } from '@angular/router';
import { CargarDocumentoComponent } from '../../cech/documentos/carga/cargar-documento/cargar-documento.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'cech/general', component: InformacionGeneralComponent },
      { path: 'cech/documentos', component: DocumentosComponent },
      { path: 'cech/documentos/cargar', component: CargarDocumentoComponent }
    ])
  ],
  declarations: [InformacionGeneralComponent, DocumentosComponent, CargarDocumentoComponent]
})
export class CechModule { }
