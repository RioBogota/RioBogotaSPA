import { Component, Inject, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PrincipalService } from '../services/principal/principal.service';
import { TipoNoticia } from '../enums/tipoNoticia';
import { IDUsuarioNavigation } from '../modelos/Seguridad';

import * as $ from 'jquery';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
        this.copiaNoticias = [
            {
                "idNoticia": 29,
                "titulo": "La Calera vivió una fiesta por el Río Bogotá",
                "descripcion": "<p>Bogotá, D.C., 11 de abril de 2019.</p><p>Ni el frío, ni la brisa fueron impedimento para que la comunidad de La Calera disfrutara el <a href=\"https://www.car.gov.co/vercontenido/2663\">“Festival vive el río Bogotá”</a> que realiza la CAR por 44 municipios de la cuenca del río, buscando generar conciencia sobre la importancia que tiene este afluente en el Territorio y para contar las acciones que se han hecho por su recuperación.</p><p>&nbsp;</p><p>Fue al son ambiental del DJ Jairo Avilán, el dueto Hermanos Sánchez y la banda local Brújula, que cada uno de los pobladores de este municipio, rico en fuentes hídricas, visitó el parque principal, donde conocieron los Proyectos Ambientales Escolares PRAE de las instituciones educativas de la zona y los PROCEDAS de las comunidades.</p><p>&nbsp;</p><p>Durante la mañana, y con el sol asomándose, se adelantó la jornada de pintura de murales alusiva a la fauna y flora, reciclatón, embellecimiento y limpieza del río Teusacá, principal afluente del río Bogotá en La Calera, con la compañía de Mario Muñoz vocalista de Dr. Krápula, sus músicos, profesionales de la CAR y la Alcaldía de La Calera.</p><p>&nbsp;</p><p><i>“En el marco del Festival del río incorporamos nuestra sexta Feria Ambiental. Estamos dando cumplimiento a la Sentencia 479 con avances superiores al 90% representados en inversiones para la actualización del POT, construcción de la primera fase del Plan Maestro de Acueducto y Alcantarillado, actualización del Plan de Gestión de Residuos Sólidos del municipio, inventario hídrico, implementación del esquema de pago por servicios ambientales en las veredas de oriente, donde nacen las principales fuentes hídricas del municipio y más de 20 mil árboles sembrados”</i>, manifestó Alejandro Sánchez, Secretario de Ambiente de La Calera.</p><p>&nbsp;</p><p>Iniciando la tarde, Dr. Krápula subió al escenario para entonar sus mejores interpretaciones, no sin antes recordar a la comunidad la importancia del río Bogotá, en medio de preguntas al público y entregando incentivos como herramientas pedagógicas y juegos.</p><p>&nbsp;</p><p>Para la recuperación del río Bogotá, la CAR adelanta la construcción y optimización de la PTAR (Planta de Tratamiento de Agua Residuales) El Salitre, la inversión de 1,5 billones de pesos para la construcción de la PTAR Canoas, la construcción de un Parque Lineal de 68 kilómetros sobre la ronda del Río, la ampliación del cauce del afluente de 30 a 60 metros para evitar inundaciones, la construcción de una PTAR en cada municipio de la cuenca del Río, navegaciones (que hoy día son posibles) y diseños de embarcaderos.</p><p>&nbsp;</p><p>La celebración terminará con un recorrido el 10, 11 y 12 de mayo, en las diferentes cuencas del afluente: Cuenca Alta - en el Páramo de Guacheneque (10 mayo) Cuenca Media – Centro de Eventos Arena Bogotá (12 mayo) y Cuenca Baja - en Ricaurte (11 mayo).</p><p>&nbsp;</p><p><i>“Es importante resaltar que todas estas iniciativas van enmarcadas dentro del cumplimiento de la sentencia del 28 de marzo de 2014, emitida por el Consejo de Estado, que ordenó la recuperación del río Bogotá”</i>, resaltó Néstor Guillermo Franco, director de la CAR Cundinamarca.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-04-11T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 38,
                        "idNoticia": 29,
                        "url": "https://www.car.gov.co/uploads/blog/nQtSSDBWZx.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 28,
                "titulo": "Granada un municipio que respira cultura y arte por el río Bogotá",
                "descripcion": "<p>Granada, Cundinamarca. 3 de abril de 2019</p><p><i>\"La puerta de Oro del Sumapaz\"</i>&nbsp;Así es conocido el municipio de Granada, en Cundinamarca,&nbsp;&nbsp;el que un 10 de agosto de 1995 se constituyó como el municipio 115 del departamento, segregándolo de Soacha.</p><p>&nbsp;</p><p>Cuando se llega al parque principal de Granada, lo saludan las calles empinadas por las 4 esquinas que esconden en el centro a&nbsp;la plaza principal, lugar donde grandes y chicos se reúnen a celebrar el arte y la cultura por el medio ambiente, un tema vital para las generaciones que aquí se levantan.</p><p>&nbsp;</p><p>Allí llegan habitantes y líderes de la comunidad, que tienen la expectativa de ver la llegada del <a href=\"https://www.car.gov.co/vercontenido/2663\">Festival Vive el Río Bogotá </a>que ha traído la CAR a su parque y a almenos otros 40 municipios de la cuenca.</p><p>&nbsp;</p><p>Preparados estaban desde muy temprano los niños, jóvenes y&nbsp;hasta los adultos que&nbsp;se reunieron en este punto y empezaron a pintar, diseñar, modelar y exponer&nbsp;todo lo que han construido como estrategia para cuidar su medio ambiente y contribuir con la recuperación del&nbsp;río Bogotá.</p><p>&nbsp;</p><p>Niños y jóvenes como Lizeth López participan en los talleres de pintura y en las actividades musicales que tiene en su colegio: <i>“Nosotros venimos hoy al parque a pintar y a cantarle al río Bogotá, sabemos que lo tenemos cerca y que todos los días si separamos los residuos en casa y sobre todo si sembramos árboles, podremos hacer algo importante por este río, además viene un grupo musical a cantar y a hablarnos de medio ambiente y&nbsp;eso nos tiene a la expectativa” </i>relató.</p><p>&nbsp;</p><p>La tarde avanza, el parque principal se llena de color, disfraces, rostros felices. Pero resalta a lo lejos, en las gradas donde se sienta la comunidad, algo llamativo y colorido que la adorna. Uno de los habitantes comenta: <i>“Aquí decidieron pintar en la grada una escultura de la cascada El Hoyo porque es una de las más importantes insignias de nuestro municipio, ahora la tenemos hecha una obra de arte aquí en el parque principal y cada vez que la vemos recordamos lo orgullosos que debemos sentirnos de nuestras fuentes hídricas, además del compromiso de seguir pendientes para cuidarlas de las basuras y las malas prácticas”.</i></p><p>&nbsp;</p><p>Y es que en la Escuela Departamental&nbsp;Gustavo Uribe Ramírez de Granada y otras, se habla de medio ambiente como materia obligada, como tema transversal a todo lo que hacen. No solo por tener uno de los bosques más grandes y los bancos de semillas más importantes de la zona, sino porque han sido ejemplo a lo largo y ancho de Cundinamarca con estas iniciativas.</p><p>&nbsp;</p><p>En la plaza principal y mientras el Festival avanza el alcalde municipal, José David Alvarado Padilla, reflexiona ante su comunidad: <i>“Que importante&nbsp;es ver hoy a la comunidad educativa, comprometida con el medio ambiente y con nuestro río Bogotá, porque desde la ciencia, los niños y jóvenes saben cómo ayudar al medio ambiente, saben que el río Bogotá tiene altos niveles de contaminación y que solo con voluntad, y trabajo desde las casas, se puede ayudar a mitigar el daño que se le ha hecho.“</i></p><p>&nbsp;</p><p>Así y mientras cae el día, los habitantes del municipio de Granada, sus niños, jóvenes, adultos mayores, docentes, administración municipal en general y todos, se han sumado con arte y cultura ambiental a celebrar el río Bogotá. No solo porque hubo un día para congregarse en torno a él, sino porque en cada esquina, calle, vereda y plaza de Granada se respira vida, gracias al talento de su gente y un nuevo emblema en su plaza principal, la cascada<i>El Hoyo</i> que inspira su riqueza ambiental.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-04-03T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 37,
                        "idNoticia": 28,
                        "url": "https://www.car.gov.co/uploads/blog/PGYbgEQBy7.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 26,
                "titulo": "María Elena Vélez Mejía, un corazón y una vida que trabaja por la comunicación y el medio ambiente",
                "descripcion": "<p>Cajicá, Cundinamarca. 02 de abril de 2019.</p><p>Hablar de constancia, patriotismo, empoderamiento y cuidado del río Bogotá, es hablar de María Elena Vélez Mejía, una mujer apasionada por la comunicación, amante de la gastronomía y la botánica. Llegó a Cundinamarca en los años 90´s desde el departamento del Quindío, con el fin de crecer y quedarse en este departamento que hoy es su casa.</p><p>&nbsp;</p><p>María Elena tiene un espíritu guerrero que contagia a todos, para que aprendan a trabajar en equipo; se considera a sí misma una líder y no un jefe, ya que para ella el secreto de mantener a un equipo de trabajo feliz, es hacer sentir a todos, parte de los logros y las derrotas como en una gran una familia.</p><p>&nbsp;</p><p>Esta encantadora comunicadora social de la Universidad Javeriana ha llegado a tener múltiples trabajos dentro de todas las jerarquías, de eso recuerda: “He tenido la fortuna de ser líder en varios proyectos, tengo un recorrido de 30 años que me han llevado a trabajar y tener experiencias en la comunicación para el desarrollo con todo tipo de personas y público. Entre otras he trabajado con la iniciativa Profesor Yarumo; un programa que se dedicaba a las buenas prácticas agrícolas, allí me encontré con el respeto y admiración por los temas ambientales, también estuve en radio Todelar conduciendo el espacio radial llamado: Descubrir, y en Caracol Radio con el programa Tierra. Recuerdo también que en los años 90 hice parte de la Corporación Autónoma Regional de Cundinamarca-CAR, recuerdo con mucha alegría que me quedaba con mis compañeros hasta largas horas de la noche, para lograr crear el Taller para Infractores Ambientales.”</p><p>&nbsp;</p><p>Y continúa recordando… “En ese momento sentía que podía salvar el mundo, (María Elena abre las manos y las apunta al cielo), recuerdo como paraba los carros porque pasaban dejando exceso de emisiones, y de inmediato me ponía el chaleco y la gorra, dejándole al infractor un comparendo pedagógico para que fueran a tomar el curso. “</p><p>&nbsp;</p><p>Hoy María Elena es la Directora Ejecutiva de la Asociación de Empresarios la Sabana- AESABANA y de la Federación de Asociaciones Empresariales de la Sabana- FEDERESA, donde influencia 4 municipios de la Sabana y agrupa a todas las asociaciones industriales, entre ellas, 115 empresas afiliadas, recibiendo en sus inicios 65 de estas.</p><p>&nbsp;</p><p>En este nuevo reto aprendió a leer las necesidades de los empresarios y asegura: “Algunos se afilian logrando un retorno de servicios económicos, de tal manera que les permite a ellos hacer networking y otras acciones dentro de la comunicación, pero aparte además lo complementan con su amor por el cuidado y preservación de la naturaleza.”</p><p>&nbsp;</p><p>Esta imparable y trabajadora mujer, hoy trabaja además en una fundación que tiene como finalidad cuidar y proteger el río Bogotá. Lo que le ha permitido estar convencida de que los programas que lidera la CAR, de la mano del proyecto de Producción Más Limpia de la Corporación es la oportunidad perfecta, para que todas las empresas continúen trabajando con buenas prácticas industriales, dentro de los casos exitosos, ella continúa trabajando en programas como lo es RACES y RedES-CAR, espacios donde siguen aunando esfuerzos por la descontaminación del Río Bogotá y los procesos amigables con el ambiente.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-04-02T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 35,
                        "idNoticia": 26,
                        "url": "https://www.car.gov.co/uploads/blog/9ImDiaZwd4.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 27,
                "titulo": "Establecen nuevo Plan de Manejo y Ordenamiento para la cuenca de Río Bogotá",
                "descripcion": "<p>Bogotá&nbsp;D.C., 2 de abril de 2018.</p><p>Como resultado de la declaratoria de emergencia económica social y ecológica, realizada por el Gobierno Nacional a través del Decreto 4580 de 2010, en respuesta a los efectos del fenómeno de La Niña acaecido en 2010 -2011, se priorizó la cuenca del río Bogotá , para la revisión y ajuste del Plan de Ordenación y manejo de la Cuenca Hidrográfica –POMCA.</p><p>&nbsp;</p><p>La importancia de esta aprobación se sustenta en el hecho de todo lo que se haga alrededor de la cuenca, debe ser bajo los lineamientos de este instrumento ambiental, esto quiere decir POTS, construcciones, etc., básicamente una carta de navegación que se debe tener en cuenta para cualquier tipo de decisión en materia ambiental.&nbsp;</p><p>&nbsp;</p><p>Actualmente el documento POMCA ha surtido todas sus etapas de socialización y agotado los diferentes espacios de retroalimentación y aclaración al documento de conformidad con las observaciones presentadas en cada una de las fases con los diferentes actores de la cuenca y hoy se firmará su última versión por parte de la CAR Cundinamarca, CORPORINOQUIA y CORPORGUAVIO.</p><p>&nbsp;</p><p>Las fases por la que pasa el estudio del POMCA son Aprestamiento (recopilación de información de campo, identificación, caracterización, priorización de actores y definición de la estrategia de participación), Diagnóstico (conformación del consejo de cuenca, determinación del estado actual de la cuenca y análisis de gestión del riesgo), Prospectiva y Zonificación Ambiental (diseño de los escenarios futuros del uso coordinado y sostenible del territorio y establecimiento de unidades homogéneas de la cuenca) y Formulación (definición del componente programático, medidas de administración de recursos naturales renovables y el componente de gestión del riesgo).</p><p>&nbsp;</p><p>En cumplimiento de la Orden 4.8 de la Sentencia del Consejo, la CAR actualizó el POMCA del río Bogotá y obtuvo el AVAL por parte del Consejo Estratégico de la Cuenca Hidrográfica del Río Bogotá, así como la aprobación de la Comisión Conjunta.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-04-02T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 36,
                        "idNoticia": 27,
                        "url": "https://www.car.gov.co/uploads/blog/YRVvQpp3oS.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 23,
                "titulo": "Desde la cuenca baja una mujer sueña y trabaja por un río Bogotá mejor",
                "descripcion": "<p>Giradot, Cundinamarca. 31 de marzo de 2019</p><p>Con una risa encantadora y con una luz única que parece resplandecer desde su interior, así recibe Fabiola Zamudio a todos los que llegan a su casa, a su trabajo y a su vida. Esta amorosa mamá ha pasado varios años de su existencia estudiando, queriéndose superar y ser el mayor orgullo de Mariana, &nbsp;su hija de 10 años. Con sus ojos de girasol, Fabiola hace memoria y recuerda: <i>“He logrado con esfuerzo y dedicación crecer en el campo profesional, hoy soy administradora de empresas y también ingeniera civil. Nací en Tolima, pero desde los 19 años he vivido en Girardot, lo que me ha convertido en una persona consiente de la contaminación del río Bogotá, lugar donde desemboca el afluente.”</i></p><p>&nbsp;</p><p>Fabiola, siempre ha tenido un gran sentido de pertenencia y ,más aún, a la importancia de los recursos naturales, es por eso, que desde muy pequeña, ha enseñado a su hija a disfrutar de la naturaleza; de su mano han hecho largas caminatas, se han subido a caballos disfrutando de días soleados, de esos que tienen un olor a eucalipto. Momentos en la memoria de Fabiola únicos e irrepetibles para ella y su hija.</p><p>&nbsp;</p><p>Ver los arboles crecer, regar cada mañana las plantas de su casa, disfrutar el sonido del agua en su lugar de trabajo; son rutinas marcadas en el diario vivir de Fabiola<br>Zamudio.</p><p>&nbsp;</p><p>Esta ingeniera tiene el privilegio de trabajar cerca del río Bogotá; para ayudarlo, ella con sus superiores y colaboradores del Hotel Lago Mar del grupo Compensar, crearon a través de su programa de mantenimiento, la implementación de una planta de tratamiento, en la cual las aguas, van hacia un lago donde &nbsp;se toman las medidas necesarias para mejorar su calidad.</p><p>&nbsp;</p><p>Estos ejemplos de compromiso con la protección del río Bogotá hacen que Fabiola recuerde: <i>“ Aquí en el Hotel Lago Mar de Compensar, en Girardot, hemos trabajado para crear, incentivar, proponer proyectos y estrategias desde una mirada económica y sostenible, por ejemplo, por medio de jornadas de capacitación apoyadas por la Corporación Autónoma Regional de Cundinamarca-CAR, actividades que han llegado a los más de 100 colaboradores para sensibilizarlos en el uso adecuado del recurso hídrico, eficiencia energética y generación de residuos, además les enseñamos acerca de las prácticas de Producción Más Limpia, con el propósito de que ellos puedan replicar la información y generar conciencia ambiental con los huéspedes que llegan a Lagomar ”.</i></p><p>&nbsp;</p><p>Otra de las actividades que inspiran la vida de Fabiola, &nbsp;es la iniciativa mundial conocida como “Hora del Planeta”. Fabiola frecuentemente, apaga las luces del hotel para sensibilizar a los huéspedes en el cuidado de recursos como el agua y la luz”.</p><p>&nbsp;</p><p>Así es como esta brillante mujer, espera que de la mano de su hija se recupere y promueva más el sentido de pertenencia por el cuidado y la admiración hacia los recursos naturales, que sea como una llama que se expanda por el mundo. Ella sueña con ver la cuenca baja del río&nbsp; Bogotá y un río limpio, sin desechos, con personas que tengan verdadera conciencia del consumo. Por eso concluye: <i>“Quiero que por medio de mis actos, otros se sumen al ejemplo y aprendan a valorar, respetar y conservar los importantes recursos que tienen a su alrededor”.</i></p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-03-31T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 32,
                        "idNoticia": 23,
                        "url": "https://www.car.gov.co/uploads/blog/Rhln26s91v.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 25,
                "titulo": "Con éxito termina auditoría del Banco Mundial sobre la recuperación del Río Bogotá",
                "descripcion": "<p>Bogotá, D.C., 30 de marzo de 2019<br>Después de que el Banco Mundial extendió el crédito a la CAR por un año más, debido al avance de las obras por la recuperación del Río Bogotá, realiza su primera auditoría del año y&nbsp; destaca el gran avance que ha registrado el proyecto.<br><br>“En la auditoría vimos que el Parque Metropolitano PTAR El Salitre registra un avance del 100%, con respecto a su base, ahora se están plantando árboles y se están construyendo senderos; con respecto a la planta de tratamiento, PTAR El Salitre, vemos que tiene un avance del 65% en obra civil y tiene un avance adelante de su cronograma de trabajo. Nos vamos satisfechos\" aseguró el gerente del Banco Mundial para el proyecto PTAR El Salitre, Antonio Rodríguez.<br><br>Entre otros proyectos se encuentra el Parque lineal que tiene un avance de más de 20 kilómetros construidos&nbsp; (a lo largo de la ronda del Río Bogotá) con el fin de que la comunidad disfrute de recreación al lado del Río Bogotá, donde se proyecta la construcción de embarcaderos y plazoletas.<br><br>Así mismo, ya se terminó la adecuación hidráulica en la cuenca media (en el tramo comprendido entre las compuertas de Alicachín en el municipio de Soacha, hasta Puente de La Virgen, en la vía Suba-Cota) donde se retiraron 8 millones de toneladas de sedimento y residuos, y se proyecta este año continuar con la adecuación hidráulica en cuenca alta en 48 km (el tramo comprendido entre el puente de la virgen en la vía Suba-Cota hasta el Puente de Vargas en el municipio de Cajicá) realizando trabajos de ampliación del cauce para evitar inundaciones, dragado, compra de predios para restauración ecológica y zonas de inundación controlada.<br><br>En cuanto al trabajo social se resaltan seminarios de capacitación a la comunidad de Suba y Engativá sobre la función e importancia de las plantas de tratamiento, y se han realizados convenios con las localidades aledañas al Río Bogotá, con el fin de sensibilizar a las comunidades sobre su cuidado.&nbsp;</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-03-30T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 34,
                        "idNoticia": 25,
                        "url": "https://www.car.gov.co/uploads/blog/2auKOALyll.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 24,
                "titulo": "CAR capacita comunidades sobre el funcionamiento e importancia de las plantas de tratamiento",
                "descripcion": "<p>Bogotá, D.C., 22 de marzo 2019.</p><p>En una jornada de tres días los participantes de esta capacitación recibirán un certificado que consta sobre su aprendizaje en el funcionamiento de las plantas de tratamiento.</p><p>&nbsp;</p><p><i>\"Es fundamental que las comunidades tengan argumentos suficientes para poder entender la problemática ambiental, en cuanto a mejorar nuestras prácticas, porque no solo sirve tener plantas de tratamiento si la comunidad no tiene en cuenta que desde casa se pueden tener nuevos hábitos de consumo para hacer más eficaz el funcionamiento de las plantas de aguas residuales\"</i> asegura el director general de la CAR, Néstor Franco.</p><p>&nbsp;</p><p>Así mismo, las prácticas ambientales que se deben tener en cuenta son: no botar aceite al sifón del lava platos porque se contamina el agua y es muy difícil extraer el aceite en una planta de tratamiento, no botar basura a la calle porque llega a las alcantarillas y por ende al Río Bogotá, no botar&nbsp;residuos sólidos al inodoro, y reciclar en casa.</p><p>&nbsp;</p><p>Finalmente, el último día de capacitación se realizará una visita a la PTAR de Bojacá, que ya está puesta en marcha, a la PTAR de Mosquera que va en un avance de construcción del 90% y se&nbsp; estima su funcionamiento en el primer semestre de este año, y al laboratorio ambiental de la Corporación en Mosquera.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-03-22T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 33,
                        "idNoticia": 24,
                        "url": "https://www.car.gov.co/uploads/blog/U5lmawa17D.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 22,
                "titulo": "Artículo del Plan Nacional de Desarrollo reduce inversiones en cuencas alta y baja del Río Bogotá",
                "descripcion": "<p>Bogotá, D.C. 12 de marzo de 2019.</p><p>El artículo 172 del Proyecto de Ley por el cual se expide el Plan Nacional de Desarrollo 2018-2022 “Pacto por Colombia, Pacto por la Equidad”, estipula que los recursos destinados para la recuperación ambiental del Río Bogotá deben ser usados solamente en la financiación de los proyectos de recuperación y saneamiento de la cuenca media del Río, como la ampliación de la planta de tratamiento Salitre, Canoas y demás obras que se requieran.<br><br>Ante esto, el director de la CAR, Néstor Guillermo Franco, manifestó su preocupación teniendo en cuenta que el mencionado artículo modificaría la normatividad vigente y dichos recursos, que llegan a la autoridad ambiental, solo puedan ser usados en el saneamiento de la cuenca media, que va desde la vía Suba – Cota hasta el Salto del Tequendama, dejando por fuera las obras de la cuenca alta, que va desde el municipio de Villapinzón hasta el Puente de la Virgen en Cota, y de la cuenca baja que va desde el Salto del Tequendama hasta el municipio de Girardot; e ignorándose que el Río Bogotá es un ecosistema que tiene que tratarse de manera integral como cuenca, en tanto que el agua que los bogotanos consumen, viene en gran parte de la cuenca alta de este afluente, y que las aguas residuales que ellos mismos generan, desde antaño vienen contaminando la cuenca baja del mismo.<br><br>El director de la Corporación también señala que el artículo presentado por el Gobierno, no tiene de presente que en lo que corresponde a la ampliación y optimización de la PTAR El Salitre, esta obra no solo ya tiene el cierre financiero con cargo solo a los recursos de la CAR, sino que hoy día se encuentra contratada y en plena ejecución, con un avance superior al 60%, de forma que no requiere recursos adicionales de ninguna índole. De otro lado, se tiene que la CAR junto con el Distrito Capital y la Gobernación de Cundinamarca, desde el año pasado lograron acuerdos para hacerle cierre financiero al proyecto de construcción de la PTAR Canoas, y tal cierre financiero se encuentra asegurado sin necesidad de recursos adicionales, de forma que la limitación impuesta por el artículo, desconoce esos dos elementos y de quedar como lo ha presentado el Gobierno sería inaplicable, pues ambas plantas ya tienen sus recursos asegurados.<br><br>La propuesta que hace la CAR para la modificación del artículo presentado por el Gobierno Nacional, es la siguiente:<br><br>ARTÍCULO 266. INVERSIONES PROGRAMA DE SANEAMIENTO DEL RÍO BOGOTÁ. Para el caso de la Corporación Autónoma Regional de Cundinamarca (CAR), el 50% de los recursos que, conforme a lo señalado por el artículo 44 de la Ley 99 de 1993, sean producto del recaudo del porcentaje o de la sobretasa ambiental al impuesto predial y de otros gravámenes sobre la propiedad inmueble de Bogotá, D.C., incluidos sus intereses y sanciones, se destinarán para la financiación de los proyectos de adecuación hidráulica, ampliación, construcción y optimización de las plantas de tratamiento de aguas residuales u otros proyectos de saneamiento o educación ambiental a desarrollar en cualquiera de las cuencas integrantes del río Bogotá, en jurisdicción de la CAR Cundinamarca.<br><br>Dicha proposición modificatoria ya fue presentada ante la magistrada Nelly Yolanda Villamizar, el pasado 11 de marzo.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-03-12T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 31,
                        "idNoticia": 22,
                        "url": "https://www.car.gov.co/uploads/blog/btckhVkeMG.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 21,
                "titulo": "Doctor Krápula, músicos que unen sus notas por el Río Bogotá",
                "descripcion": "<p>Bogotá D.C., 28 de febrero de 2019</p><p>David es el bajista, y el eje central de los temas ambientales y sociales; Nico, el baterista, es el encargado de poner orden en la agrupación; Germán el rocanrrolero, genio de la música y la guitarra; Sergio hace los aportes al sonido y suma unas excelentes relaciones públicas a la banda; y Mario, el dueño de la potente voz que distingue a la agrupación, tiene también un gran talento para comunicar.</p><p>&nbsp;</p><p>Hoy los une una condición que está por encima de la fama y de las puertas que se abren cuando se logra el éxito en la música. &nbsp;Son como hermanos, &nbsp;un colectivo&nbsp; que &nbsp;ha logrado llegar a lugares que jamás imaginaron, con una discografía de &nbsp;9 &nbsp;grabaciones, &nbsp;y &nbsp;&nbsp;reconocimientos como &nbsp;Premios Shock y Nuestra Tierra; además han sido condecorados por el Congreso de la Republica de Colombia y reconocidos por su gestión ambiental.</p><p>&nbsp;</p><p>Mario Muñoz, vocalista de la banda, resume el carácter de la agrupación ”Doctor Krápula diciendo que “es Colombia, es &nbsp;símbolo de resistencia, de conciencia, de persistencia, de educación, porque en esta banda todos nos sentimos orgullosos de todo lo que en nombre de Doctor Krápula hemos trabajado, hemos hecho grandes proyectos en todos los aspectos, incluso del medio ambiente.”</p><p>&nbsp;</p><p>Viajando por aquella línea del tiempo y la vida, Mario recuerda cómo eran unos “polluelos”, unos jóvenes soñadores &nbsp;con posiciones críticas frente a diversos temas. De ahí que su música en esencia haya sido para&nbsp; denunciar; pero ahora, &nbsp;con la experiencia acumulada durante años, entienden que deben además de cuestionar, &nbsp;proponen alternativas a los problemas sociales de la actualidad. Mario asegura: “Hoy nos sentimos más útiles que en otro tiempo, éramos un grupo famoso que movilizaba mucha gente, pero digamos que solo hacíamos música, hoy logramos que nuestra música, se convirtiera en acciones”.</p><p>&nbsp;</p><p>Son unos activistas ambientales y eso les encanta, brota por cada una de las venas de sus integrantes esa pasión al hablar de medio ambiente. Todos ellos son personas con ideas claras y un enfoque de firmeza frente a sus propias convicciones ambientales. Es por eso, que desde el 2012 realizan el “Festival Viva El Planeta” que nació del lanzamiento del álbum número seis, en un “toque” en el Palacio de los Deportes de Bogotá; donde en compañía de otras bandas, se sumaron para ser parte de un festival que promueve acciones por el ambiente y que los puso en la escena del tema socio ambiental. Hoy en día este festival se realiza en 4 ciudades de Colombia: Medellín, Paipa, Cali y Bogotá.</p><p>&nbsp;</p><p>David, además de su pasión y conocimiento por el bajo, reconoce que ese sello de conciencia que tiene Doctor Krápula se lo deben también a la posibilidad de viajar por Colombia de norte a sur, convivir con su gente, y entender la necesidad del agua y de otros recursos de los que carecen, algunas poblaciones, entre ellas las &nbsp;comunidades indígenas.</p><p>&nbsp;</p><p>Hoy esta gran agrupación se ha unido a la Corporación Autónoma Regional de Cundinamarca –CAR en la expedición del primer “Festival Vive el Río Bogotá”, una iniciativa que los lleva a realizar un&nbsp; recorrido por los 44 municipios que hacen parte de la cuenca de este importante río y 5 localidades del Distrito Capital. Además de acompañar el recorrido, estos músicos de corazón y las comunidades, realizarán jornadas en las que podrán conocer las experiencias, aprendizajes y conclusiones de la expedición en cada territorio, hasta el día 12 de mayo cuando se dará cierre al festival a propósito del día del Río Bogotá.</p><p>&nbsp;</p><p>La voz cantante del grupo, Mario, hace una reflexión sobre toda esta actividad y destaca:&nbsp;“Entendemos el impacto que estamos generando al recorrer con nuestro mensaje todo un territorio tan importante, como lo es&nbsp; la cuenca del río Bogotá, donde hemos vivido y hecho parte, juntos con amigos y familia. Conocer cada uno de los municipios, su gente y poder crear conciencia por medio de nuestra música, es todo un lujo. Además, cerrar esta expedición en ese gran escenario como lo es Arena Bogotá, justo al lado del río Bogotá, es lograr enviar un mensaje muy claro a la ciudadanía de que el río está ahí, y que se puede hacer mucho por el recurso hídrico”.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-02-28T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 30,
                        "idNoticia": 21,
                        "url": "https://www.car.gov.co/uploads/blog/uCAbu2hB3v.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 19,
                "titulo": "Con llaves viejas construirán primera escultura en honor al Río Bogotá",
                "descripcion": "<p>Bogotá&nbsp;D.C., 22 de febrero de 2019</p><p>El objetivo de esta campaña es recolectar, entre los meses de febrero y marzo, por lo menos 20 toneladas de llaves en desuso, para luego fundirlas y crear con la primera escultura en honor al Río Bogotá. También se puede donar cualquier tipo material metálico.</p><p>&nbsp;</p><p>Esta obra de arte estará ubicada en una de las entradas occidentales a la capital, sobre la calle 80 cerca al puente de Guadua, punto principal del Parque Lineal que se está construyendo sobre la ronda del Río, considerado uno de los más largos de Latinoamérica, con una extensión de 68 kilómetros desde Cota hasta Soacha.</p><p>&nbsp;</p><p>El director de la Corporación Autónoma Regional, Néstor Guillermo Franco, hizo la invitación a todos los ciudadanos para que se sumen a esta gran campaña, denominada ‘Somos la llave del Río Bogotá’: <i>“Tenemos que hacer un enorme esfuerzo para que la comunidad se apropie del Río Bogotá, lo sienta suyo, y por eso hemos considerado que la construcción del Parque Lineal alrededor del Río, puede ser la enorme oportunidad para que todos los bogotanos y los habitantes de los 46 municipios de la cuenca, miremos hacia él y le aportemos” </i>señaló</p><p>&nbsp;</p><p>En todas las 14 regionales del territorio CAR estará instalado un recipiente para recolectar las llaves, incluyendo la sede central de la Corporación, en la Avenida Calle 24 (Av Esperanza) No. 62 – 49 en Bogotá.&nbsp;También se pueden acercar a las alcaldías locales de Suba, Fontibón, Bosa y Kennedy. La entrega de las llaves puede realizarse de <strong>lunes a viernes de 8:00 AM a 4:00 PM</strong></p><p>&nbsp;</p><p>Esta campaña hace parte de todas las acciones que ha emprendido la Corporación Autónoma Regional de Cundinamarca, por la recuperación del Río Bogotá. Con ella, la entidad busca que los capitalinos y demás habitantes de los municipios de la cuenca, hagan su aporte simbólico y se acerquen a este afluente, al que por años se le ha dado la espalda.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-02-22T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 28,
                        "idNoticia": 19,
                        "url": "https://www.car.gov.co/uploads/blog/uJ5bEXe3rT.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 17,
                "titulo": "Dr. Krápula y la CAR celebran el Festival del Río Bogotá",
                "descripcion": "<p>Bogotá, D.C., 14 de febrero de 2018</p><p>Con presentaciones de sensibilización artística, histórica y fotográfica, la comunidad de los municipios de la cuenca del río se unirán y conocerán la importancia del afluente en su diario vivir, con el fin de generar conciencia sobre su cuidado y protección.</p><p>&nbsp;</p><p><i>“Los invitamos a ser parte de esta celebración, vamos a dejar de darle la espalda al Río Bogotá que es lo más importante que tiene nuestra región. Disfrutaremos de buena música y del amor por el río”</i> aseguró Mario Muñoz, vocalista de la agrupación Dr. Krápula.</p><p>&nbsp;</p><p>El festival arranca en los municipios de Villapinzón el 20 de febrero y continuará con la siguiente programación:</p><p>&nbsp;</p><p><strong>Cuenca Alta:</strong></p><p>&nbsp;</p><p>Tausa y Cucunubá 21 de febrero</p><p>Suesca y Sesquilé 22 de febrero</p><p>Gachancipá y Tocancipá 27 de febrero</p><p>Zipaquirá y Nemocón 28 de febrero</p><p>Sopó y Guatavita 1 de marzo</p><p>Cota y Chía 7 de marzo</p><p>Cajicá y Cogua 8 de marzo</p><p>Tabio y Tenjo 14 de marzo</p><p>La Calera 28 de Marzo</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>Cuenca Media:</strong></p><p>&nbsp;</p><p>Funza y Mosquera 14 de marzo</p><p>Sibaté y Soacha 21 de marzo</p><p>Granada (Cundinamarca)&nbsp;22 de marzo</p><p>Subachoque y El Rosal 3 de abril</p><p>Madrid y Facatativá 4 de abril</p><p>Bojacá y Zipacón 5 de abril</p><p>Bogotá 6, 13, 20, 27 y 29 de marzo</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>Cuenca Baja:</strong></p><p>&nbsp;</p><p>San Antonio del Tequendama y Tena 10 de abril</p><p>La Mesa y El Colegio 11 de abril</p><p>Anapoima y Quipile 12 de abril</p><p>Apulo y Tocaima 24 de abril</p><p>Viotá y Agua de Dios 25 de abril</p><p>Girardot 26 de abril</p><p>Anolaima y Cachipay 3 de mayo</p><p>&nbsp;</p><p>La celebración terminará con un recorrido los últimos tres días, 10, 11 y 12 de mayo, en las diferentes cuencas del afluente: Cuenca Alta - en el Páramo de Guacheneque (10 mayo)&nbsp; Cuenca Media – Centro de Eventos Arena Bogotá (12 mayo) y Cuenca Baja - en Ricaurte (11 mayo).</p><p>&nbsp;</p><p>Con esta expedición también se busca&nbsp; dar a conocer las acciones que está haciendo la Corporación por la recuperación del Río, como la construcción y optimización de la PTAR (Planta de Tratamiento de Agua Residuales) El Salitre, la inversión de 1,5 billones de pesos para la construcción de la PTAR Canoas, la construcción de un Parque Lineal de 68 kilómetros sobre la ronda del Río, la ampliación del cauce del afluente de 30 a 60 metros para evitar inundaciones, la construcción de una Ptar en cada municipio de la cuenca del Río, navegaciones (que hoy en día es posible hacerlo) y diseños de embarcaderos.</p><p>&nbsp;</p><p><i>“Es importante resaltar que todas estas iniciativas van enmarcadas dentro del cumplimiento de la sentencia del 28 de marzo de 2014, emitida por el Consejo de Estado, que ordenó la recuperación del río Bogotá”</i>, resaltó Néstor Guillermo Franco, director de la CAR Cundinamarca.</p><p>&nbsp;</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2019-02-14T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 25,
                        "idNoticia": 17,
                        "url": "https://www.car.gov.co/uploads/blog/3AqtL6lgki.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 3,
                "titulo": "CAR capacitará a hoteleros de la cuenca baja del Río Bogotá",
                "descripcion": "<p>Girardot, Cundinamarca. 30 de octubre de 2018.&nbsp;</p><p>Este 31 de octubre y 1 de noviembre, la Corporación Autónoma Regional de Cundinamarca – CAR, realizará desde el Banco de la República en Girardot, el seminario “Turismo sostenible: un paso más cerca del sello ambiental”, que contará con la presencia de expertos ambientales de parte de la Universidad Piloto, la Corporación Ambiental Empresarial y la CAR (le puede interesar: Así es REDES-CAR el programa para empresas sostenibles). El día inaugural se abordarán temas relacionados con producción más limpia, turismo sostenible, eficiencia energética, tratamiento de aguas y uso eficiente del agua.&nbsp;</p><p>En la jornada del día jueves se incluirán temas relacionados con el manejo de residuos, sello ambiental colombiano y experiencias exitosas; escenarios en lo que de acuerdo a la metodología diseñada, habrá espacio para la retroalimentación e intercambio de conocimientos (Le puede interesar: Estos son los programas educación y cultura ambiental que promueve la CAR). De acuerdo con Ginna Barrera, profesional en trabajo social de la CAR, este trabajo es un aporte más de la Corporación en la descontaminación del Río Bogotá, donde los empresarios e industriales del sector hotelero serán involucrados como actores importantes en la implementación de buenas prácticas, invitándolos a que sumen acciones concretas en la recuperación de la cuenca hídrica.</p>",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co",
                "activa": true,
                "idUsuario": 1,
                "fechaPublicacion": "2019-01-21T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 3,
                        "idNoticia": 3,
                        "url": "https://www.car.gov.co/uploads/blog/Np1lWJ5AzZ.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 8,
                "titulo": "CAR y Policía Nacional se unen en una maratón de limpieza en el Río Bogotá.",
                "descripcion": "Bogotá, D.C., 30 de noviembre 2018.\n\nLa iniciativa llamada Plogging run fue una maratón de limpieza que se realizó desde Lisboa (Suba) hasta Arena Bogotá (Cota), donde funcionarios y contratistas de la CAR Cundinamarca, la Dirección de Carabineros y la Dirección de Sanidad de la Policía Nacional, recorrieron 8 kilómetros trotando y recogiendo basura sobre la ronda del Río Bogotá.\n\n“Hoy estuvimos reunidas 142 personas en pro del medio ambiente. Logramos recoger casi 3 toneladas de residuos. Si todas las personas todos los días hacemos  algo por el medio ambiente, logramos revertir los actos negativos que van en contra del mismo” señaló Carlos Bello, director de Evaluación, Seguimiento y Control Ambiental de la CAR.\n\nAl final de la competencia se realizó un pesaje con las bolsas de basura de cada entidad y se recolectaron 3 toneladas de residuos.  Al ver estos resultados se hace un llamado a la comunidad a no arrojar basura a la calle y a tener más conciencia ambiental sin darle la espalda al Río Bogotá.\n\nLa Corporación está realizando varios proyectos para recuperar el afluente, como la construcción y optimización de la PTAR El Salitre (Planta de Tratamiento de Agua Residuales), inversión de 1,5 billones de pesos para la construcción de la PTAR Canoas, construcción de un parque lineal de 68 kilómetros sobre la ronda del Río, ampliación del cauce del afluente de 30 a 60 metros para evitar inundaciones y diseños de embarcaderos.",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co/",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2018-11-30T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 8,
                        "idNoticia": 8,
                        "url": "https://www.car.gov.co/uploads/blog/5YQWwXN3sV.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 7,
                "titulo": "CAR prepagó parte de la deuda al Banco Mundial en Crédito para recuperación del Río Bogotá",
                "descripcion": "Bogotá, D.C., 28 de noviembre de 2018\n\nEn el marco del Proyecto de Adecuación Hidráulica y Recuperación Ambiental del Rio Bogotá, que se encuentra financiado con recursos de préstamo otorgado por el Banco Mundial a la CAR y que asciende a la suma de 250 millones de dólares, la Autoridad Ambiental, previa autorización de su Consejo Directivo, procedió al prepago de 45 millones de dólares, adelantando de esa manera el cronograma originalmente previsto para los pagos, todo ello gracias a las buenas condiciones financieras de la entidad, y a la convicción del gobierno corporativo respecto a la necesidad de reducir cartera en moneda extranjera ante la fuerte devaluación que se viene dando en los últimos meses. \n\nLa decisión de prepagar el mencionado monto, genera ventajas muy importantes para la CAR, entidad que hoy día tiene calificación AAA+ y F1 dada por Fitch Ratings Colombia, entre las cuales se destaca el utilizar los recursos disponibles en el Fondo para las Inversiones Ambientales del Río Bogotá- FIAB  de una manera racional mediante la reducción de costos financieros, al disminuir el monto de la deuda externa que se tiene con el Banco Mundial; liberar cupo presupuestal en la deuda pública externa que tiene la Nación con la Banca Multilateral, para poder destinarlo a otros proyectos en el país y reducir los riesgos por devaluación del peso.\n\nCabe destacar que el prepago efectuado se liquidó a una tasa de cambio de $3.141,63 pesos por dólar, que comparada con la del día de hoy, que está en $3.250,56 pesos por dólar, ya ha representado un ahorro de cerca de 5 mil millones de pesos por cuenta de tal operación, al tiempo que no generó ningún tipo de pago adicional derivado del crédito.\n\n“Con este pago anticipado no solo se ahorra el diferencial cambiario de la operación frente a la fluctuación de la moneda, sino también el pago de intereses de la Corporación que se reduce en cerca de 15 mil millones de pesos en el corto plazo, permitiendo que esta suma se pueda destinar para otros proyectos” aseguró el Director General de la Entidad, Néstor G. Franco.\n\nCon los recursos de este préstamo, suscrito desde el año 2011, junto con otras fuentes de recursos propios de la CAR, se han ejecutado importantes obras en la cuenca media del Río Bogotá como:\n\nAmpliación y Optimización de la PTAR El Salitre: La planta hoy trata 4 metros cúbicos de agua residual por segundo y con la construcción de la segunda fase, pasará a tratar 7,1 metros cúbicos de agua por segundo, en caudal medio. Con la implementación de la tecnología denominada \"lodos activados con desinfección\", la calidad del agua en tratamiento de la PTAR El Salitre, podrá ser usada para usos agrícolas y pecuarios. El proyecto contempla la construcción de un parque metropolitano con usos ambientales mayoritariamente y deportivos. Hoy día el desarrollo del proyecto registra un 44% de avance, el cual supera ampliamente el cronograma de trabajo establecido en el contrato, de forma que pueda entrar a operar dentro de 15 meses.\n\nAdecuación Hidráulica: Funciona para mitigar y disminuir los riesgos por inundaciones y desbordamientos del Río en su cuenca media, por medio de la intervención en 68 km (en el tramo comprendido entre las compuertas de Alicachín en el municipio de Soacha, hasta el puente de La Virgen, en la vía Suba-Cota) donde se realizó el retiro de más de 8 millones de toneladas en sedimentos y residuos que habían sido arrojados durante décadas al Río. Además, se amplió el cauce de 30 a 60 metros de ancho, que permite duplicar la capacidad de transporte de agua de 100 a 200 metros cúbicos por segundo, obra que ya ha sido culminada en la cuenca media.\n\nTambién se hizo la restauración ecológica de los predios y las zonas de ronda del Río con la plantación de más de 120 mil árboles plantados, que corresponden a 20 especies nativas como Cedro, Cajeto, Saúco, Caucho Sabanero, Guayacán de Manizales, Robles, Chichalá, entre otros (teniendo en cuenta su mantenimiento y crecimiento). Estas plantaciones se realizan junto con la comunidad residente de 42 sectores de la cuenca media.\n\nLa restauración ecológica viene acompañada de 68 km destinados a la construcción de un parque lineal con senderos peatonales disponibles para la comunidad y de los cuales, a la fecha, se han construido 13 km, incluyendo el parque San Nicolás de Soacha, el parque Porvenir en Mosquera y el Parque Lineal en Suba. Ya está en construcción 40 kilómetros de senderos desde Soacha hasta Suba, parque lineal considerado como uno de los más largos de Latinoamérica.\n\nEste prepago de una parte del crédito solicitado al Banco Mundial marca un importante precedente de transparencia y efectividad en la ejecución de obras.",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2018-11-28T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 7,
                        "idNoticia": 7,
                        "url": "https://www.car.gov.co/uploads/blog/8mL3UffVBZ.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 6,
                "titulo": "Estudiantes y maestros que ya creen en el río Bogotá",
                "descripcion": "Soacha, Cundinamarca. 21 de noviembre de 2018\n\n¡Sorprendidos! Así quedaron los estudiantes de trabajo social de la Universidad Colegio Mayor de Cundinamarca. Una grata sorpresa, contada desde la experiencia y los ojos de la docente Claudia Usaquén y la estudiante Lorena Chalá.\n\nPara algunos, hablar de trabajo social como profesión, es hablar del valor de la cercanía y el trabajo con la comunidad, donde hay proyectos cargados de pasión y tesón, que están allí para orientar a las personas en distintas dinámicas sociales.\n\nPero para los jóvenes de las Universidades La Salle, Distrital, Uniminuto Soacha, y por su puesto Colegio Mayor de Cundinamarca, es hora de que el trabajo social se involucre también con temas tan importantes como trabajar en la Gestión del Riesgo y el cuidado del medio ambiente. Es por esto que durante el 2018 estos jóvenes tomaron la materia Gestión del Riesgo como electiva en sus pénsums para conocer qué pueden hacer al sumarse a la titánica labor de recuperar y volver a la vida el Río Bogotá.\n\nLa profesora Claudia Usaquén, una mujer apasionada por su labor y profesión como trabajadora social y especialista en Desarrollo Humano, sabe que todos los días son para vivir con fuerza y pasión. Ella, con su voz tranquila y su forma práctica de explicar, ha llegado a cientos de alumnos a lo largo de su carrera, por eso no dudó en buscar el apoyo de la CAR para dar un paso más con sus estudiantes.\n\nAsí recuerda la idea de llevar a sus estudiantes a conocer las obras y el cambio que ya tiene el Río Bogotá: “Pensamos en una salida de campo dentro del proceso de aprensión de conocimientos en Gestión del Riesgo con los estudiantes, para que al ver las acciones que se han consolidado a lo largo del río Bogotá, los estudiantes entiendan que el componente social ha sido fundamental y seguirá siendo para que la gente tome conciencia y cuide este importante recurso.”\n\nAsí, y luego de aprender conceptos y términos clave, estos jóvenes se dieron cita muy temprano. Desde las 7 de la mañana fueron a encontrarse con el equipo de la CAR que una vez les entregaron chalecos salvavidas y algunas indicaciones de seguridad, los llevaron a recorrer las zonas recuperadas, adecuadas y mejoradas del río Bogotá.\n\nPara Lorena Chalá, además de ser una sorpresa, con emoción asegura: Para mí fue un súper aprendizaje, pues somos habitantes de Bogotá y a veces nos alejamos de esa realidad. Ver cómo podemos navegar el río, cómo este se ha recuperado, no hay basura, no hay malos olores, me ha dejado sorprendida y entusiasmada a derrumbar esos mitos de que el río era lo peor”.\n\nLa CAR con sede en Soacha, además de acompañar con sus trabajadores sociales estos recorridos para distintas comunidades, ha sumado esfuerzos con la academia para que jóvenes, maestros y sus familias, conozcan la importancia del río Bogotá, y el valor del trabajo hecho allí, que mejora la dinámica y le devuelve algo de la riqueza natural que le han quitado al río.\n\nMientras iba en la lancha, la profesora Claudia pensaba en todo lo que pueden aprender sus estudiantes al salir y ver el medio ambiente que les rodea. Asegura que lo más importante es la conciencia: cambiar y generar conciencia en la gente.\n\nPara Lorena y sus compañeros, más que emocionante, esta forma de aprender fuera del aula, y aprender cómo se ha mejorado el río Bogotá es un As bajo la manga, por eso asegura: “Si la gente conociera así en vivo, sintiendo como pasa el río Bogotá debajo de una lancha, lo imponente e importante que es, tomarían más conciencia y se sumarian a ese trabajo que hace la CAR de la mejor manera, dejando de hacer actividades que ponen en riesgo las mejoras que ya se ven en el río.”\n\nCon la experiencia de estas dos mujeres, hoy se puede afirmar que los estudiantes y la comunidad educativa que acompañaron el recorrido sí creen en el río Bogotá y se comprometen a luchar desde su experiencia por su cuidado y conservación.",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2018-11-21T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 6,
                        "idNoticia": 6,
                        "url": "https://www.car.gov.co/uploads/blog/ovlpav5SVp.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 5,
                "titulo": "Millonaria multa deberá pagar empresa curtidora por contaminar el río Bogotá",
                "descripcion": "Bogotá, D.C., 14 de noviembre de 2018.\n\nPor realizar vertimientos sin tratamiento previo al río Bogotá, producto del proceso de curtido de cueros, la empresa Leathercol S.A.S, ubicada la vereda Casablanca, en jurisdicción del municipio de Villapinzón, fue sancionada por más de 531 millones de pesos, mediante Resolución 3514 del 31 octubre de 2018.\n\nSi bien en el 2015, la CAR había otorgado a la sociedad Curtidos Leathercol S.A.S, un permiso de vertimientos para la descarga de las aguas residuales, provenientes de la planta de tratamiento de la industria de curtidos, la autoridad ambiental verificó, a través de visitas técnicas, que esta empresa realizaba el vertimiento directo de las aguas residuales industriales al río Bogotá, sin pasar por el sistema de tratamiento, incumpliendo el permiso de otorgado.\n\nAsí mismo, el personal técnico de la Corporación realizó la toma de tres muestras de aguas residuales (arriba del vertimiento, al propio vertimiento y aguas abajo del mismo), que luego fueron sometidas a la correspondiente caracterización por parte del Laboratorio Ambiental de la Corporación, permitiendo establecer que las muestras tomadas, superaban los límites máximos permisibles para vertimientos al recurso agua.\n\nAnte estos hechos, la Corporación procedió a iniciar una investigación sancionatoria ambiental contra Leathercol S.A.S y formuló cargos por infringir la prohibición legal de verter, sin tratamiento previo, aguas residuales que puedan contaminar fuentes hídricas.\n\nUna vez a analizados los descargos de la empresa mencionada y luego de agotar la etapa probatoria respectiva, con apego al debido proceso, la Corporación determinó las afectaciones ambientales como resultado del proceso de curtido del cuero, poniendo en riesgo la calidad de las aguas del río Bogotá, los ecosistemas relacionados al mismo e incluso, la salud humana de los habitantes de la cuenca.\n\nLa CAR Cundinamarca reitera el llamado a cumplir la normatividad ambiental, con el ánimo de salvaguardar los recursos naturales. Al respecto, el director Jurídico de la CAR, Juan Camilo Ferrer Tobón, indicó que “no basta con tramitar y obtener las correspondientes licencias, sino que lo más importante, es cumplir con las obligaciones adquiridas al momento de obtener los instrumentos administrativos de control requeridos; de no ser así, la Corporación en su proceso de fortalecimiento de la autoridad ambiental, impondrá las correspondientes sanciones para evitar el deterioro de los recursos naturales en la jurisdicción”.",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2018-11-14T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 5,
                        "idNoticia": 5,
                        "url": "https://www.car.gov.co/uploads/blog/bNK40W1qpQ.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            },
            {
                "idNoticia": 4,
                "titulo": "El Río Bogotá ahora estará vigilado con moderno sistema de seguridad",
                "descripcion": "Bogotá, D.C., 27 de septiembre de 2018.\n\nLa CAR Cundinamarca firmó un convenio con la Corporación de Alta Tecnología Para la Defensa  (CODALTEC)  para crear un sistema de monitoreo, que permitirá incrementar la seguridad de la cuenca media (Cota hasta el Salto del Tequendama) del Río Bogotá en tiempo real.\n\n “Este sistema de monitoreo detectará posibles infractores y reducirá los impactos ambientales generados sobre el Río por terceros, también será posible detectar si se presentan desbordamientos en el afluente” Asegura Gerardo Romero, Coordinador técnico DESCA de la sentencia del Río Bogotá, CAR. Algunos ejemplos de estas infracciones son: botar basura al Río, presencia de ganado sobre el jarillón (terraplén o monto de tierra que impide que el río se desborde en temporada de lluvias) y que por su peso lo dañan y rompen, vertimientos no autorizados etc.\n\nEl sistema cuenta con 14 puntos de vigilancia, con una distancia de 7 kilómetros, cada uno, a lo largo de la cuenca media, específicamente entre los municipios de Chía, Cota, Bogotá D.C, Funza, Mosquera y Soacha. Contará con instrumentos de telecomunicaciones, los cuales facilitarán la recepción, procesamiento, visualización y almacenamiento de la información proveniente de las plataformas de sensores (cámaras ópticas y térmicas, plataforma de monitoreo mediante vehículos aéreos no tripulados y estaciones meteorológicas), vigilancia con sensores ópticos de visión diurna y nocturna, dos puntos de monitoreo del río con medición de nivel, temperatura, humedad y presión atmosférica ,y sensores geosísmicos para detectar intrusos en el cuerpo de agua.\n\nLa información obtenida será trasladada al Centro de Control y Monitoreo Ambiental-(CCMA) que está ubicado en la Planta de Tratamiento de Aguas Residuales - PTAR El Salitre, el cual tendrá como apoyo un Centro de Soporte Logístico Integrado - CSLI operado por CODALTEC, desde donde se atenderán las incidencias relacionadas con el sistema y se desplegarán los vehículos aéreos no tripulados – UAVs -, para verificar eventos que sucedan en el área de la cuenca media del Río.\n\nEste sistema entrará a operar a finales de octubre del 2018 y tuvo una inversión de aproximadamente 5.900 millones de pesos.\n\n \n\nSocialización del proyecto en los municipios de la Cuenca Media:\n\nLa CAR visita a cada municipio de la cuenca media para socializar el proyecto con las alcaldías, la Secretaría de Ambiente y la Secretaría de Planeación Social, con el fin de ponerlos al tanto sobre los beneficios del sistema de monitoreo para la seguridad del Río Bogotá.\n \n\nEn estos momentos la CAR se encuentra resolviendo varios recursos de reposición de la empresa y de la misma comunidad para que se evalúe cada una de las objeciones interpuestas por los recurrentes, y así dejar en firme la Resolución 2516, para que se haga uso responsable del sendero por parte de todos los bogotanos y demás visitantes.",
                "idTipoNoticia": 1,
                "referencias": "https://www.car.gov.co",
                "activa": true,
                "idUsuario": 2,
                "fechaPublicacion": "2018-09-27T00:00:00",
                "idTipoNoticiaNavigation": null,
                "idUsuarioNavigation": null,
                "multimediaNoticia": [
                    {
                        "idMultimediaNoticia": 4,
                        "idNoticia": 4,
                        "url": "https://www.car.gov.co/uploads/blog/sE21dDlRKR.jpeg",
                        "idTipoMultimedia": 1,
                        "activa": true,
                        "idNoticiaNavigation": null,
                        "idTipoMultimediaNavigation": null
                    }
                ]
            }
        ]
        this.paginar({ pageIndex: 0, pageSize: this.pageSize })
        this.length = this.noticias.length;

        this.principalService.getNoticias(tipoNoticia).subscribe((result) => {
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
            });
    }

    mostrarMapa = (url: string, tipoCuenca: string) => {
        this.tituloCuenca = tipoCuenca;
        this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
