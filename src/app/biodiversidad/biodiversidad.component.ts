import { Component } from '@angular/core';

@Component({
    selector: 'biodiversidad',
    templateUrl: './biodiversidad.component.html'
})

export class BiodiversidadComponent {
    private tematicas: any = [
        { text: 'Especies Focales', btn_text: 'Focales', imagen: 'http://www.extrategiamedios.com/images/noticias/2017/Mayo/MedioAmbiente/Colombiaaves.jpg', descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula accumsan placerat. In elementum imperdiet erat a lobortis. Curabitur efficitur, purus in condimentum ultricies, elit mi eleifend nulla, sit amet hendrerit massa ipsum eu lectus. Suspendisse vehicula mi nisi, et maximus risus scelerisque quis. Ut suscipit nec massa vitae consequat. Cras sagittis augue quam, viverra egestas arcu ultrices eget. Vivamus a lobortis risus. Ut in urna ultrices nisl placerat ornare. Nulla facilisi.', redireccion: 'focales' },
        { text: 'Especies Invasoras', btn_text: 'Invasoras', imagen: 'http://elnuevosiglo.com.co/sites/default/files/styles/noticia_interna/public/Pez%20de%20colombia.png?itok=z4vMd8Rr', descripcion: 'Integer feugiat nec urna vestibulum mattis. Suspendisse porttitor lectus sodales urna fringilla laoreet. Cras volutpat faucibus ex eget pulvinar. Pellentesque id purus nibh. Aliquam sed varius nisl. In eget pretium erat. Curabitur blandit luctus ipsum porttitor ultrices. Etiam ex nulla, consectetur ut imperdiet at, congue vitae libero. Phasellus efficitur consequat odio a semper. Maecenas nulla tellus, tristique et ex eget, tincidunt iaculis nulla.', redireccion: 'google.com'},
        { text: 'Especies Amenazadas', btn_text: 'Amenazadas', imagen: 'http://awsassets.panda.org/img/original/jaguar_face.jpg', descripcion: 'Nunc tincidunt pellentesque lorem sit amet gravida. Aliquam erat volutpat. Nullam varius velit in massa venenatis blandit. Mauris euismod est sed mi ultricies mollis. Pellentesque mauris neque, tempor ac sagittis non, dictum in urna. Curabitur vitae velit libero. Duis neque metus, condimentum tristique ornare at, mattis vel libero. Aenean id sapien ante.', redireccion: 'google.com' },
        {
            text: 'Áreas Importantes para la Conservación de las Aves (AICAS)', btn_text: 'AICAS', imagen: 'http://www.revistaecoguia.com/images/p%C3%A1jaro1.jpg', descripcion: 'Proin et auctor nunc. Curabitur sed dignissim ligula. Vivamus tempus, sapien ac euismod scelerisque, massa dui gravida lorem, ac ornare risus purus vel velit. Fusce laoreet dolor id neque efficitur euismod. Nulla commodo risus orci, id aliquet libero tincidunt non. Ut tincidunt magna euismod ornare sollicitudin.', redireccion: 'google.com' },
        { text: 'Registros biológicos', btn_text: 'Registros biológicos', imagen: 'http://reporte.humboldt.org.co/biodiversidad/assets/img/2016/1/103/103-registros-biologicos-de-cordados.png', descripcion: 'Phasellus nec justo quis lacus blandit ultricies. Aenean consequat mauris at urna fermentum imperdiet. Vestibulum pulvinar sem quis nisi sodales, in scelerisque felis dictum. Aliquam euismod, tortor sit amet volutpat porttitor, mi nisi fringilla justo, sed venenatis diam urna sit amet leo. Pellentesque consequat turpis aliquam facilisis tincidunt.', redireccion: 'google.com' }
    ]

    notificacion = () => {
    }

    constructor () {
    }
}