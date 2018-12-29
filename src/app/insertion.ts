export class Insertion {
  private _prefix: string;
  private _text: string;
  private _suffix: string;

  constructor(prefix: string, text: string, suffix: string) {
    this._prefix = prefix;
    this._text = text;
    this._suffix = suffix;
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
