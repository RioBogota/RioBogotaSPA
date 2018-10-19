import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './navmenu/navmenu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { BiodiversidadComponent } from './biodiversidad/biodiversidad.component';
import { FocalesComponent } from './especies/focales/focales.component';
import { LoginComponent } from './seguridad/login/login.component';
import { UsuarioComponent } from './seguridad/usuario/usuario.component';
import { RolComponent } from './seguridad/rol/rol.component';
import { OpcionComponent } from './seguridad/opcion/opcion.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HeaderComponent,
        FooterComponent,
        CounterComponent,
        HomeComponent,
        BiodiversidadComponent,
        FocalesComponent,
        LoginComponent,
        UsuarioComponent,
        RolComponent,
        OpcionComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'biodiversidad', component: BiodiversidadComponent },
            { path: 'focales', component: FocalesComponent},
            { path: 'app/:idUsuario', component: AppComponent },
            { path: 'login', component: LoginComponent },
            { path: 'usuario', component: UsuarioComponent },
            { path: 'rol', component: RolComponent },
            { path: 'opcion', component: OpcionComponent }
        ])
    ]
})
export class AppModuleShared {
}
