import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Output() closePopup = new EventEmitter<void>();
  isPopupDisplayed: boolean = true;
  selectedFileName: string | null = null;
  isSuccess: boolean = false;
  showImageNotUploadedMessage: boolean = false;

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file ? file.name : null;
    
    this.isSuccess = false;
    this.showImageNotUploadedMessage = false;
  }

  onSubmit() {
    if (!this.selectedFileName) {
      this.showImageNotUploadedMessage = true;
      return;
    }

    setTimeout(() => {
      this.isSuccess = true;
      console.log('File uploaded successfully:', this.selectedFileName);
      setTimeout(() => {
        this.isSuccess = false;
      }, 5000); 
    }, 1500);
  }
}