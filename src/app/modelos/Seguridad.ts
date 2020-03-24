export class Opcion {
    idOpcion:      number;
    nombre:        string;
    descripcion:   string;
    idOpcionPadre: number;
    ruta:          string;
    opcionRol:     OpcionRol[];
}

export class OpcionRol {
    idOpcionRol:     number;
    idOpcion:        number;
    idRol:           number;
    idRolNavigation: IDRolNavigation;
}

export class IDRolNavigation {
    idRol:      number;
    nombre:     string;
    opcionRol:  null[];
    rolUsuario: RolUsuario[];
}

export class RolUsuario {
    idRolUsuario:        number;
    idRol:               number;
    idUsuario:           number;
    idUsuarioNavigation: IDUsuarioNavigation;
}

export class IDUsuarioNavigation {
    idUsuario:       number;
    usuario1:        string;
    primerNombre:    string;
    segundoNombre:   string;
    primerApellido:  string;
    segundoApellido: string;
    correo:          string;
    telefono:        string;
    celular:         string;
    contrasena:      string;
    rolUsuario:      Array<RolUsuario>;
}
