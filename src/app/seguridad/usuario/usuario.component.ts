import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { IDRolNavigation, IDUsuarioNavigation, RolUsuario } from 'src/app/modelos/Seguridad';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
	public roles: Array<IDRolNavigation>;
	public usuario: IDUsuarioNavigation | any;
	public confirmacionContrasena: string;
	public rolUsuario: IDRolNavigation;
	public valido: Boolean;
	public editar: Boolean;
	public entidades: any;
	entidadUsuario;

	constructor(private seguridadService: TokenInterceptorService, private router: ActivatedRoute) {
		//this.entidades = ["CAR", "SDA", "Gobernación"];
		this.usuario = new IDUsuarioNavigation();
		this.usuario.rolUsuario = new Array<RolUsuario>();
		this.valido = true;
		this.editar = false;
		this.router.params.subscribe(result => {
			if (result.id) {
				this.seguridadService.getUsuarioEspecifico(result.id).subscribe((response: any) => {
					this.usuario = response;
					this.editar = true;
					if (this.roles && this.roles.length) {
						this.rolUsuario = response.rolUsuario[0].idRolNavigation;
						const filtrados = this.roles.filter(x => x.idRol == this.rolUsuario.idRol);
						this.rolUsuario = filtrados[0];
					}
				}, error => {
					console.error(error)
				});
			}
		}, error => {
			console.error(error);
		})

		//Se obtienen entidades
		this.seguridadService.getEntities().subscribe(result => {
			this.entidades = result
			this.entidades.forEach(element => {
				this.entidadUsuario = element.idEntidad
			});
		}, 
		error => {
			console.error(error)
		})
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
		this.seguridadService.getRoles().subscribe((result) => {
			this.roles = result;
			if (!this.rolUsuario) {
				this.rolUsuario = this.roles[0];
				return;
			}
			const filtrados = this.roles.filter(x => x.idRol == this.rolUsuario.idRol);
			this.rolUsuario = filtrados[0];
		}, (error) => {
			console.error(error);
		});		
	}


	
	guardar = () => {
		let usuarioRol: RolUsuario = new RolUsuario();
		usuarioRol.idRol = this.rolUsuario.idRol;
		this.usuario.rolUsuario[0] = usuarioRol;

		this.usuario.idEntidad = this.entidadUsuario

		if (!this.editar) {
			this.seguridadService.guardarUsuario(this.upper(this.usuario)).subscribe((result) => {
				alert("Usuario guardado exitosamente");
			}, (error) => { console.error(error); });
			return;
		}
		this.usuario.rolUsuario[0].idUsuario = this.usuario.idUsuario;
		this.seguridadService.actualizarUsuario(this.usuario).subscribe(response => { alert("usuario actualizado exitosamente") }, error => { console.error(error) });
	}

	validar = () => {
		this.valido = this.usuario.contrasena === this.confirmacionContrasena;
		return this.valido;
	}
}
