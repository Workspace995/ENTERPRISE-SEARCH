import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatentDataModalComponent } from 'src/app/patent-data-modal/patent-data-modal.component'; // Adjust the path as needed

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() result: any;
  @Input() hit:any;

  constructor(public dialog: MatDialog) {}
  // handleClick(event: Event,
  //   data:any): void {
  //     event.preventDefault();
  //     this.openDialog(data);
  //   }
  handleClick(event: Event, data: any): void {
    event.preventDefault();

    console.log("Data URI: ", data.Uri);

    if (data.uri && data.uri !== '0' && data.uri !== 'PDF not found'&&data.uri !== 'null') {
      console.log("Valid URI detected, opening new window: ", data.uri);
      window.open(data.uri, '_blank');
    } else {
      console.log("Invalid URI, opening dialog box.");
      this.openDialog(data);
    }
  }



  openDialog(data: any): void {
    this.dialog.open(PatentDataModalComponent, {
      data: data
    });
  }
}
