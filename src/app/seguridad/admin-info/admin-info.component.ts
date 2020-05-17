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
	private documentosCopia: any;
	public estado: any;
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
			this.documentosCopia = result;
		}, error => {
			error.log
		}));
	}

	private _selectedFilterEstado: string[];
	get selectedFilterEstado(): string[] {
		return this._selectedFilterEstado;
	}
	set selectedFilterEstado(value: string[]) {
		this._selectedFilterEstado = value;
		this.filtrarEstado(value);
	}

	public estados = [{ nombre: 'No Aprobado/No Importado', idEstado: 1 }, { nombre: 'Aprobado/Importado', idEstado: 2 }]

	filtrarEstado(value) {
		if (!value) {
			this.documentos = this.documentosCopia;
			return;
		}
		if (!value.length) {
			this.documentos = this.documentosCopia;
			return;
		}
		this.documentos = this.documentosCopia.filter(x => value.includes(x.idEstado))
	}

	cambiarEstado(documento) {
		documento.idEstado = 1;
		if (documento.aprobado) {
			documento.idEstado = 2;
		}
		documento.importando = true;
		this.unsubscribeOndestroy(this.principalService.actualizarEstadoDoc(documento).subscribe(result => {
			this.estado = result;
			documento.importando = false;
		}, () => {
			documento.importando = false;
		}));
	}

	ngOnInit() {
	}

}
