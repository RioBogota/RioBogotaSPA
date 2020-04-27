import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConsultaNoticiasComponent } from '../../principal/noticias/consulta-noticias/consulta-noticias.component';
import { EditarNoticiaComponent } from '../../principal/noticias/editar-noticia/editar-noticia.component';
import { FormsModule } from '@angular/forms';
import { SentenciaComponent } from '../../sentencia/sentencia.component';
import { CuencasComponent } from '../../principal/cuencas/cuencas.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContactoComponent } from '../../principal/contacto/contacto.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { OwlModule } from 'ngx-owl-carousel';
import { SoporteComponent } from '../../principal/soporte/soporte.component';
import { MultimediaComponent } from '../../principal/multimedia/multimedia.component';
import { ImagenesModal } from '../../principal/multimedia/multimedia.component';
import { UnicaComponent } from '../../principal/vista/unica/unica.component';
import { MultipleComponent } from '../../principal/vista/multiple/multiple.component';
import { SiteMapComponent } from '../../principal/site-map/site-map.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CargarDocumentoComponent } from '../../principal/vista/carga/cargar-documento/cargar-documento.component';
import { CommonRioBogModule } from '../common/common.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IrcaComponent } from 'src/app/hidrico/indicadores/irca/irca.component';
import { FinancieroComponent } from '../../cech/indicadores/financiero/financiero.component';
import { ConsultarContactoComponent } from '../../principal/contacto/consultar-contacto/consultar-contacto.component';
import { FacebookComponent } from '../../principal/facebook/facebook.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    CKEditorModule,
    OwlModule,
    MatTabsModule,
    PdfViewerModule,
    MatIconModule,
    MatExpansionModule,
    CommonRioBogModule,
    RouterModule.forChild([
      { path: 'noticias/consulta', component: ConsultaNoticiasComponent },
      { path: 'noticias/editar/:id', component: EditarNoticiaComponent },
      { path: 'noticias/add', component: EditarNoticiaComponent },
      { path: 'cuencas/:id', component: CuencasComponent },
      { path: 'sentencia', component: SentenciaComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'contacto/get', component: ConsultarContactoComponent },
      { path: 'soporte', component: SoporteComponent },
      { path: 'multimedia/:id', component: MultimediaComponent },
      { path: 'unica/:id', component: UnicaComponent },
      { path: 'multiple/:id', component: MultipleComponent },
      { path: 'site/map', component: SiteMapComponent },
      { path: 'documento/sitio/carga', component: CargarDocumentoComponent},
      { path: 'facebook', component: FacebookComponent}
    ])
  ],
declarations: [
  ConsultaNoticiasComponent, 
  EditarNoticiaComponent, 
  SentenciaComponent, 
  CuencasComponent, 
  ContactoComponent, 
  SoporteComponent, 
  MultimediaComponent, 
  ImagenesModal,  
  UnicaComponent, 
  MultipleComponent, 
  SiteMapComponent, 
  CargarDocumentoComponent, 
  IrcaComponent, 
  FinancieroComponent, ConsultarContactoComponent, FacebookComponent
],
  entryComponents: [ImagenesModal]
})
export class PrincipalModule { }
