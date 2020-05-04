import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { IDRolNavigation, IDUsuarioNavigation, RolUsuario } from 'src/app/modelos/Seguridad';
import { ActivatedRoute } from '@angular/router';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';
@Component({
	selector: 'usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends Base {
	public roles: Array<IDRolNavigation>;
	public usuario: IDUsuarioNavigation | any;
	public confirmacionContrasena: string;
	public rolUsuario: IDRolNavigation;
	public valido: Boolean;
	public editar: Boolean;
	public entidades: any;
	entidadUsuario;

	constructor(private seguridadService: TokenInterceptorService, private router: ActivatedRoute, private appService: AppService) {
		super();
		//this.entidades = ["CAR", "SDA", "Gobernación"];
		this.usuario = new IDUsuarioNavigation();
		this.usuario.rolUsuario = new Array<RolUsuario>();
		this.valido = true;
		this.editar = false;
		//TODO Remove nested observables
		this.unsubscribeOndestroy(this.router.params.subscribe(result => {
			if (result.id) {
				this.unsubscribeOndestroy(this.seguridadService.getUsuarioEspecifico(result.id).subscribe((response: any) => {
					this.usuario = response;
					this.editar = true;
					if (this.roles && this.roles.length) {
						this.rolUsuario = response.rolUsuario[0].idRolNavigation;
						const filtrados = this.roles.filter(x => x.idRol == this.rolUsuario.idRol);
						this.rolUsuario = filtrados[0];
					}
				}, error => {
					console.error(error)
				}));
			}
		}, error => {
			console.error(error);
		}));

		//Se obtienen entidades
		this.unsubscribeOndestroy(this.seguridadService.getEntities().subscribe(result => {
			this.entidades = result
			this.entidadUsuario = this.entidades[0].idEntidad
			this.entidades.forEach(element => {
				if (this.editar && element.idEntidad === this.usuario.idEntidad) {
					this.entidadUsuario = element.idEntidad;
				}
			});
		},
			error => {
				console.error(error)
			}));
	}

	upper = (obj: any) => {
		for (var prop in obj) {
			if (typeof obj[prop] === 'string' && prop !== 'contrasena') {
				obj[prop] = obj[prop].toUpperCase();
			}
			if (typeof obj[prop] === 'object') {
				this.upper(obj[prop]);
			}
		}
		return obj;
	}

	ngOnInit() {
		this.unsubscribeOndestroy(this.seguridadService.getRoles().subscribe((result) => {
			this.roles = result;
			if (!this.rolUsuario) {
				this.rolUsuario = this.roles[0];
				return;
			}
			const filtrados = this.roles.filter(x => x.idRol == this.rolUsuario.idRol);
			this.rolUsuario = filtrados[0];
		}, (error) => {
			console.error(error);
		}));
	}



	guardar = () => {
		let usuarioRol: RolUsuario = new RolUsuario();
		usuarioRol.idRol = this.rolUsuario.idRol;
		this.usuario.rolUsuario[0] = usuarioRol;

		this.usuario.idEntidad = this.entidadUsuario

		if (!this.editar) {
			this.unsubscribeOndestroy(this.seguridadService.guardarUsuario(this.upper(this.usuario)).subscribe((result) => {
				this.appService.success("Usuario guardado exitosamente");
			}, (error) => {
				this.appService.error('Se produjo un error al guardar el usuario, intente nuevamente mas tarde.');
				console.error(error);
			}));
			return;
		}
		this.usuario.rolUsuario[0].idUsuario = this.usuario.idUsuario;
		this.unsubscribeOndestroy(this.seguridadService.actualizarUsuario(this.usuario).subscribe(response => {
			this.appService.success("usuario actualizado exitosamente");
		}, error => {
			this.appService.error('Se produjo un error al actualizar el usuario, intente nuevamente mas tarde.');
			console.error(error)
		}));
	}

	validar = () => {
		this.valido = this.usuario.contrasena === this.confirmacionContrasena;
		return this.valido;
	}
}
