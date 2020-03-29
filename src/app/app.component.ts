import { Component, HostListener } from '@angular/core';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { AppService } from './services/app.service';
import { Router } from '@angular/router';
import { Base } from './shared/base';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent extends Base {
    showScroll: boolean;
    showScrollHeight = 300;
    hideScrollHeight = 10;
    
    opcionesPadre: any;
    usuario: any = sessionStorage.usuario ? JSON.parse(sessionStorage.usuario) : undefined;
    sceneView: any;

    constructor(private usuarioOpcService: TokenInterceptorService, private appService: AppService, public router: Router) { 
        super();
        this.opcionesPadre = [{hijos: []}]
    }

    //ScrollTop
    @HostListener('window:scroll', [])
    onWindowScroll() 
    {
        if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) 
        {
            this.showScroll = true;
        } 
        else if ( this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) 
        { 
            this.showScroll = false; 
        }
    }

        
    scrollToTop() 
    { 
        (function smoothscroll() 
        { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; 
            if (currentScroll > 0) 
            {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

    //obtener opciones del menú//
    obtenerOpciones = () => {
        this.usuario = sessionStorage.usuario ? JSON.parse(sessionStorage.usuario) : undefined;
       this.unsubscribeOndestroy(this.usuarioOpcService.getOpciones(this.usuario).subscribe(      
            result => {
                var opcionesPadre = result
                this.opcionesPadre = opcionesPadre.filter(x => x.idOpcionPadre == null);
                for (let index = 0; index < this.opcionesPadre.length; index++) {
                    const opcionHijo = result.filter(y => y.idOpcionPadre == this.opcionesPadre[index].idOpcion);
                    this.opcionesPadre[index].hijos = opcionHijo;
                }
            },
            error => {
                console.error(error)
            }
        ));
    }

    ngOnInit(){
        if(this.usuario){
            this.obtenerOpciones()
        }
        this.unsubscribeOndestroy(this.appService.checkUserInfo.subscribe(result => {
            this.obtenerOpciones()
        }, error => {}));
    }

    
    
}
