export class Error {
  name: string;
  message: string;
  template: string;
  field: string;

  constructor(name: string, message: string, template: string, field: string) {
    this.name = name;
    this.message = message;
    this.template = template;
    this.field = field;
  }
}
