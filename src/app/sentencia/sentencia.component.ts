import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentencia',
  templateUrl: './sentencia.component.html',
  styleUrls: ['./sentencia.component.css']
})
export class SentenciaComponent implements OnInit {
  pdfSrc: string = '../../assets/Infografia_RB.pdf';

  constructor() { }

  ngOnInit() {
  }

}
