import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/seguridad/login/login.component';
import { UsuarioComponent } from 'src/app/seguridad/usuario/usuario.component';
import { OpcionComponent } from 'src/app/seguridad/opcion/opcion.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConsultarComponent } from '../../seguridad/usuarios/consultar/consultar.component';
import { OpcionesComponent } from '../../seguridad/opciones/opciones.component';
import { RolesComponent } from '../../seguridad/roles/roles.component';
import { SoporteAdminComponent } from '../../seguridad/soporte-admin/soporte-admin.component';
import { CorreoComponent } from '../../seguridad/usuarios/consultar/correo/correo.component';
import { ModulosComponent } from '../../seguridad/modulos/modulos.component';
import { AdminInfoComponent } from '../../seguridad/admin-info/admin-info.component';
import { CommonRioBogModule } from '../common/common.module';
import { TruncatePipe } from 'src/app/pipes/truncate_text.pipe';
import { AgregarComponent } from '../../seguridad/roles/agregar/agregar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    CKEditorModule,
    CommonRioBogModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'registro/crear', component: UsuarioComponent },
      { path: 'usuario/:id', component: UsuarioComponent },
      { path: 'roles/consultar', component: RolesComponent },
      { path: 'opcion', component: OpcionComponent },
      { path: 'opcion/editar/:id', component: OpcionComponent },
      { path: 'opciones/consultar', component: OpcionesComponent }, 
      {path: 'usuarios/consultar', component: ConsultarComponent }, 
      {path: 'soporte/admin', component: SoporteAdminComponent },
      {path: 'usuario/cambiar/correo', component: CorreoComponent },
      {path: 'modulos', component: ModulosComponent},
      { path: 'admin/info', component: AdminInfoComponent },
      { path: 'agregar/rol', component: AgregarComponent }
    ])
  ],
  declarations: [
    LoginComponent,
    UsuarioComponent,
    OpcionComponent,
    ConsultarComponent,
    OpcionesComponent,
    RolesComponent,
    SoporteAdminComponent,
    CorreoComponent,
    ModulosComponent,
    AdminInfoComponent,
    TruncatePipe,
    AgregarComponent
  ]
})
export class SeguridadModule { }
