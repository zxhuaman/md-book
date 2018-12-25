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
  private selection = window.getSelection();
  private range: Range;
  left = 0;
  top = 0;

  onClick($event: any) {
    console.log(event);
    console.log(window.getSelection());
    this.left = $event.clientX - 7;
    this.top = $event.clientY - 28;
  }

  onChange($event: Event): void {
    console.log('onChange', event);
  }

  onInput(ev: any): void {
    console.log(ev.data.length);
    this.renderHtml = this.md.render(ev.target.value);
  }
}
