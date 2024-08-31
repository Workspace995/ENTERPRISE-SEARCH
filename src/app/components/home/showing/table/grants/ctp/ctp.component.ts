import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-ctp',
  templateUrl: './ctp.component.html',
  styleUrls: ['./ctp.component.css']
})
export class CtpComponent {
  @Input() hit: any;

  highlight(paramName: string) {
    if(this.hit.highlight && this.hit.highlight[paramName]) {
        return this.hit.highlight[paramName].join(" ")
    } else {
      return this.hit._source[paramName]
    }
  }
}

