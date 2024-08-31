import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grant-details-popup',
  templateUrl: './grant-details-popup.component.html',
  styleUrls: ['./grant-details-popup.component.css']
})
export class GrantDetailsPopupComponent {
  @Input() details: any;

  keys: any = []

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.keys = Object.keys(this.details);
  }
}
