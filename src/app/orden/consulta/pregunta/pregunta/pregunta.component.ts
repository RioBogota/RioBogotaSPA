import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../encuesta/encuesta.model';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;

  @Output()
  archivoCargado = new EventEmitter<any>();

  get isValid() { return this.form.controls[this.question.key].valid; }
  get hasErrors() { return this.form.controls[this.question.key]?.errors; }

  constructor() { }

  ngOnInit() {
  }

  cargarArchivo(event) {
    this.archivoCargado.emit(event)
  }

}
