import { QuestionBase } from './encuesta.model';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
}