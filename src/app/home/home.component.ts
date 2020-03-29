import { Component, Inject, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PrincipalService } from '../services/principal/principal.service';
import { TipoNoticia } from '../enums/tipoNoticia';
import { IDUsuarioNavigation } from '../modelos/Seguridad';

import * as $ from 'jquery';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';
import { Base } from '../shared/base';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent extends Base {
    public noticias: any;
    public copiaNoticias: any;
    public secundarias: any;
    public intereses: any;
    public usuario: IDUsuarioNavigation;
    public ultimas: any;
    public destacadas: any;
    public eventos: any;
    public tab: string = 'Ultimo';
    public tituloCuenca: string;
    // MatPaginator Inputs
    public length = 0;
    public pageSize = 4;
    public pageSizeOptions: number[] = [4];
    public urlMapa: SafeScript;
    // MatPaginator Output
    pageEvent: PageEvent;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('paginator', { read: ElementRef, static: true }) paginatorObject: ElementRef;
    constructor(private principalService: PrincipalService, private sanitizer: DomSanitizer) {
        super();
        this.tituloCuenca = 'Cuenca Completa';
        this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl('https://carcundinamarca.maps.arcgis.com/apps/webappviewer/index.html?id=ab2c1a43b5da4d7fbf547683a2b7a1df');
    }

    paginar = (event) => {
        const indiceInicial = event.pageIndex * event.pageSize;
        const indiceFinal = indiceInicial + (event.pageSize - 1);
        const noticias = this.copiaNoticias.map((current, index, array) => {
            if (index >= indiceInicial && index <= indiceFinal) {
                return current;
            }
        });
        this.noticias = noticias.filter(x => x !== undefined);
        let message = this.paginatorObject.nativeElement.querySelector('.mat-paginator-range-label');
        message.innerHTML = 'Página ' + (this.paginator.pageIndex + 1) + ' de ' + (this.paginator.pageSize + 1)
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.obtenerNoticias(TipoNoticia.PRINCIPAL);
        this.obtenerNoticias(TipoNoticia.SECUNDARIA);
        this.obtenerNoticias(TipoNoticia.INTERES);
        this.obtenerNoticias(TipoNoticia.DESTACADO);
        this.obtenerNoticias(TipoNoticia.EVENTOS);
        this.obtenerNoticias(TipoNoticia.ULTIMO);
        const usuario = sessionStorage.getItem('usuario');
        if (usuario) {
            this.usuario = JSON.parse(usuario);
        }

    }

    seleccionarTab = (tab: string) => {
        this.tab = tab;
    }

    obtenerNoticias = (tipoNoticia: TipoNoticia) => {
        this.noticias = [];
        this.unsubscribeOndestroy(this.principalService.getNoticias(tipoNoticia).subscribe((result) => {
            if (tipoNoticia == TipoNoticia.PRINCIPAL) {
                this.copiaNoticias = result;
                this.paginar({ pageIndex: 0, pageSize: this.pageSize })
                this.length = result.length;
            }
            if (tipoNoticia == TipoNoticia.SECUNDARIA) {
                this.secundarias = result;
            }
            if (tipoNoticia == TipoNoticia.INTERES) {
                this.intereses = result;
            }
            if (tipoNoticia == TipoNoticia.ULTIMO) {
                this.ultimas = result;
            }
            if (tipoNoticia == TipoNoticia.DESTACADO) {
                this.destacadas = result;
            }
            if (tipoNoticia == TipoNoticia.EVENTOS) {
                this.eventos = result;
            }
        },
            (err) => {
                console.error(err);
            }));
    }

    mostrarMapa = (url: string, tipoCuenca: string) => {
        this.tituloCuenca = tipoCuenca;
        this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
