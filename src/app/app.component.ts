import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ts-ignore
  private md = window.markdownit();
  renderHtml = '';

  onInput(ev: any): void {
    this.renderHtml = this.md.render(ev.target.value);
  }
}
