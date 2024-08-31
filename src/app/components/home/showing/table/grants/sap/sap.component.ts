import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatentDataModalComponent } from 'src/app/patent-data-modal/patent-data-modal.component'; // Adjust the path as needed

@Component({
  selector: 'app-sap',
  templateUrl: './sap.component.html',
  styleUrls: ['./sap.component.css']
})
export class SapComponent {
  @Input() hit: any;

  constructor(public dialog: MatDialog) {}

  highlight(paramName: string) {
    if (this.hit.highlight && this.hit.highlight[paramName]) {
      return this.hit.highlight[paramName].join(' ');
    } else {
      return this.hit._source[paramName];
    }
  }

  handleClick(event: Event, data: any): void {
    event.preventDefault();
    console.log('Data URI: ', data.uri);

    if (data.uri && data.uri !== '0' && data.uri !== 'PDF not found' && data.uri !== 'null') {
      console.log('Valid URI detected, opening new window: ', data.uri);
      window.open(data.uri, '_blank');
    } else {
      console.log('Invalid URI, opening dialog box.');
      this.openDialog(data);
    }
  }

  openDialog(data: any): void {
    this.dialog.open(PatentDataModalComponent, {
      data: data,
    });
  }
}
