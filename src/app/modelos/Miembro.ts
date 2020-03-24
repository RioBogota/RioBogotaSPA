export class Miembro {
    idMiembroComite: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    celular: string;
    correo: string;
    idCargo: number;
    idComite: number;
    idCargoNavigation: {
        idCargo: number;
        descripcion: string;
        idEntidad: number;
        idEntidadNavigation: {
            idEntidad: number;
            descripcion: string;
            cargo: any[]
        };
        miembroComite: any[

        ]
    };
    idComiteNavigation: {
        idComite: number;
        descripcion: string;
        urlEstructuraOperativa: string;
        miembroComite: any[]
    }
}