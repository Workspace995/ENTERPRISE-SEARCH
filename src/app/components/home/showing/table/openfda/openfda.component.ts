import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-openfda',
  templateUrl: './openfda.component.html',
  styleUrls: ['./openfda.component.css']
})
export class OpenfdaComponent {
  @Input() hit: any;

  highlight(paramName: string) {
    if(this.hit.highlight && this.hit.highlight[paramName]) {
        return this.hit.highlight[paramName].join(" ")
    } else {
      return this.hit._source[paramName]
    }
  }
}
