export class QuestionBase<T> {
  value: T;
  key: any;
  keyAdd: any;
  label: string;
  required: boolean;
  max?: number;
  minlength?: number;
  order: number;
  controlType: string;
  type: string;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      keyAdd?: any;
      label?: string;
      required?: boolean;
      max?: number;
      minlength?: number;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.max = options.max || Number.MAX_VALUE;
    this.minlength = options.minlength;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
