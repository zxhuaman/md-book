export class Tool {
  private _operation: string;
  private _title: string;
  private _prefix: string;
  private _text: string;
  private _suffix: string;


  constructor(operation: string, title: string, prefix: string, text: string, suffix: string) {
    this._operation = operation;
    this._title = title;
    this._prefix = prefix;
    this._text = text;
    this._suffix = suffix;
  }

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get prefix(): string {
    return this._prefix;
  }

  set prefix(value: string) {
    this._prefix = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get suffix(): string {
    return this._suffix;
  }

  set suffix(value: string) {
    this._suffix = value;
  }
}
