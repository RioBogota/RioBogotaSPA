import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SeguridadModule } from './modulos/seguridad/seguridad.module';
import { SaeModule } from './modulos/sae/sae.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavMenuComponent } from './shared/navmenu/navmenu.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { PrincipalModule } from './modulos/principal/principal.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CarouselComponent } from './principal/carousel/carousel.component';
import { DetalleComponent } from './principal/noticias/detalle/detalle.component';
import { OwlCarouselComponent } from './principal/owl-carousel/owl-carousel.component';
import { OwlModule } from 'ngx-owl-carousel';
import { CechModule } from './modulos/cech/cech.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrdenModule } from './modulos/orden/orden/orden.module';


@NgModule({
    declarations: [
        
        AppComponent,        
        FooterComponent,
        HeaderComponent,
        NavMenuComponent,
        HomeComponent,
        SideMenuComponent,
        CarouselComponent,
        DetalleComponent,
        OwlCarouselComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        SeguridadModule,
        PrincipalModule,
        SaeModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatPaginatorModule,    
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatTabsModule,
        MatTableModule,
        OwlModule,
        CechModule,
        OrdenModule,
        MatExpansionModule,
        RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'noticias/detalle/:id', component: DetalleComponent }
], { relativeLinkResolution: 'legacy' })
    ],
    exports:[]
})
export class AppModuleShared {
}
