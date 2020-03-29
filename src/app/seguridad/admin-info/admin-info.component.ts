import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';

@Component({
	selector: 'app-admin-info',
	templateUrl: './admin-info.component.html',
	styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent extends Base implements OnInit {

	public documentos: any;
	public estado: any;
	public importando = false;
	constructor(private principalService: PrincipalService) {
		super();
		this.unsubscribeOndestroy(this.principalService.verDocumentos().subscribe(result => {
			for (var i = 0; i < result.length; i++) {
				let document = result[i];
				document.aprobado = true;
				if (document.idEstado == 1) {
					document.aprobado = false;
				}
			}
			this.documentos = result;
		}, error => {
			error.log
		}));

	}

	cambiarEstado(documento) {
		documento.idEstado = 1;
		if (documento.aprobado) {
			documento.idEstado = 2;
		}
		this.importando = true;
		this.unsubscribeOndestroy(this.principalService.actualizarEstadoDoc(documento).subscribe(result => {
			this.estado = result;
			this.importando = false;
		}, () => {
			this.importando = false;
		}));
	}

	ngOnInit() {
	}

}
