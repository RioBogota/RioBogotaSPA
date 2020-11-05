import { QuestionBase } from './encuesta.model';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
}