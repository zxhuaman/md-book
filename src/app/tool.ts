export class Tool {
  private _title: string;
  private _operation: string;

  constructor(title: string, operation: string) {
    this._title = title;
    this._operation = operation;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }
}
