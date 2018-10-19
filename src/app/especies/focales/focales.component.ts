import { Component } from '@angular/core';

@Component({
    selector: 'focales',
    templateUrl: './focales.component.html'
})

export class FocalesComponent {
    private especiesfocales: any = [
        { especie: "Dendrocygna bicolor", nombre: "Iguasa maría", descripcion: "Es una especie de ave anseriforme de la familia Anatidae. Habita en todas las regiones tropicales del mundo: en gran parte de Centro y Sudamérica, las Indias Occidentales, el sur de los Estados Unidos, África subsahariana y el subcontinente indio. Tiene un plumaje principalmente pardo rojizo, piernas largas y un pico largo y gris, y una franja blanca distintiva en toda la cola negra durante el vuelo. Al igual que otros miembros de su antiguo linaje, tiene una llamada ruidosa que en vuelo o en el suelo. El hábitat preferido son los lagos poco profundos, arrozales y otros humedales con vegetación abundante.", prioridad: "Alta", imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Dendrocygna_bicolor_-Harewood_Bird_Garden%2C_Leeds%2C_England-8a.jpg/399px-Dendrocygna_bicolor_-Harewood_Bird_Garden%2C_Leeds%2C_England-8a.jpg" },
        { especie: "Tigrisoma lineatum", nombre: "Vaco colorado", descripcion: "El avetigre colorado u hocó colorado (Tigrisoma lineatum) es una especie de ave pelecaniforme de la familia Ardeidae1​2​ ampliamente distribuida por toda la región neotropical. Se le encuentra desde México hasta Uruguay, por toda la América Central y la mayor parte de Sudamérica.", prioridad: "Alta", imagen: "https://farm6.staticflickr.com/5251/5422262866_f9f8dd9277_b.jpg" },
        { especie: "Gallinula melanops", nombre: "Polla sabanera", descripcion: "La gallineta pintada (Gallinula melanops), también conocida como tagüita, polla pintada, polla sabanera, polla de agua pico verde, pollona pintada y tingua moteada,2​ es una especie de ave gruiforme de la familia Rallidae que se distribuye por América del Sur.", prioridad: "Alta", imagen: "https://www.icesi.edu.co/wiki_aves_colombia/show_image.php?id=2947&scalesize=o" },
        { especie: "Pyrrhura calliptera", nombre: "Periquito aliamarillo", descripcion: "Mide 23 cm de longitud. Pico amarillento pálido. Área ocular desnuda blancuzca. Plumaje verde, con corona color marrón oscuro; garganta y pecho marrón oscuro con escamas color ante; cubiertas de los oídos, parche en el vientre y cola color granate.", prioridad: "Baja", imagen: "https://www.mascotarios.org/wp-content/uploads/2012/04/Perico-aliamarillo.jpg" }
    ]
}