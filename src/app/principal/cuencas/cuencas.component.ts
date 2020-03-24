import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuencas',
  templateUrl: './cuencas.component.html',
  styleUrls: ['./cuencas.component.css']
})
export class CuencasComponent implements OnInit {
  public titulo: string;
  public descripcion: string;
  constructor(private routerId: ActivatedRoute, public router: Router) {
    this.routerId.params.subscribe(result => {
      if (result.id) {
        this.obtenerCuenca(result.id);
        return;
      }
    }, error => {
      console.error(error);
    });
  }

  obtenerCuenca = (idCuenca: string) => {
    switch (idCuenca) {
      case '1':
        {
          this.titulo = 'Cuenca Alta';
          this.descripcion = `Tramo: La Cuenca Alta va desde el nacimiento del Río Bogotá,
          en Villapinzón hasta el puente de la Virgen de Cota.<br>
          Longitud del río en el tramo: 170km.<br>
          Caudal medio: El caudal medio en la estación de la Virgen es de 13.5 m3/s.<br>
          Uso principal del agua: El agua del río se utiliza para la potabilización y 
          suministro de agua para consumo de la ciudad de Bogotá en la Planta de Tratamiento de Tibitóc. `;
          break;
        }
        case '2':
        {
          this.titulo = 'Cuenca Media';
          this.descripcion = `Tramo: La Cuenca Media va desde el puente de la Virgen (Cota),
          hasta antes del Embalse del Muña en Alicachín.<br>
          Longitud del río en el tramo: 90km.
          <br>
          Caudal medio: El aporte medio de aguas, principalmente de aguas 
          residuales domésticas, en esta cuenca es el más importante con caudales medios de 37 m3/s.<br>
          Uso principal del agua: Existe una demanda significativa de agua para riego a través del Distrito de Riego de la Ramada. `;
          break;
        }
        case '3': {
          this.titulo = 'Cuenca Baja';
          this.descripcion = `Tramo: La Cuenca Baja va desde el Embalse del Muña hasta la desembocadura del Río Magdalena.<br>
          Longitud del río en el tramo: 120km.;
          <br>
          Caudal medio: El Río Bogotá en su desembocadura tiene caudales del orden de los 50 m3/s.
          <br>
          Uso principal del agua: El agua del Río Bogotá se entuba para ser utilizada en la generación eléctrica.`;
          break;
        }
      default:
        break;
    }
  }

  ngOnInit() {
  }

}
