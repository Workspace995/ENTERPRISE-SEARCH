import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-patent-data-modal',
  templateUrl: './patent-data-modal.component.html',
  styleUrls: ['./patent-data-modal.component.css']
})
export class PatentDataModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  isValidUrl(value: string): boolean {
    const invalidValues = ["0", "PDF not found", "Error"];
    if (invalidValues.includes(value)) {
      return false;
    }

    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
}
