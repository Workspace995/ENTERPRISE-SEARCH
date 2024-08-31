import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-s3',
  templateUrl: './s3.component.html',
  styleUrls: ['./s3.component.css']
})
export class S3Component {
  @Input() hit: any;

  highlight(paramName: string) {
    if(this.hit.highlight && this.hit.highlight[paramName]) {
        return this.hit.highlight[paramName].join(" ")
    } else {
      return this.hit._source[paramName]
    }
  }
}
