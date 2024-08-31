import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GrantDetailsPopupComponent } from './grant-details-popup/grant-details-popup.component';

@Component({
  selector: 'app-grants',
  templateUrl: './grants.component.html',
  styleUrls: ['./grants.component.css']
})
export class GrantsComponent {
  @Input() hit: any;

  constructor(private modalService: NgbModal) {}


  openPopup() {
		const modalRef = this.modalService.open(GrantDetailsPopupComponent, {size: "lg"});
		modalRef.componentInstance.details = this.hit._source;
  }

  highlight(paramName: string) {
    if(this.hit.highlight && this.hit.highlight[paramName]) {
        return this.hit.highlight[paramName].join(" ")
    } else {
      return this.hit._source[paramName]
    }
  }
}
