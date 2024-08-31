import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-structured',
  templateUrl: './structured.component.html',
  styleUrls: ['./structured.component.css'],
})
export class StructuredComponent {
  // @ViewChild('structure') private structure!: ElementRef;
  // question: string | null | undefined = "";
  // answer: string | null | undefined = "";
  // strctureForm = new FormGroup({
  //   message: new FormControl('')
  // });
  // currentUser: any = null;
  // isSearching = false;

  // constructor(private chatService: ChatService) { }

  // ngOnInit() {
  //   let user = localStorage.getItem("user");
  //   if (user) {
  //     this.currentUser = JSON.parse(user);
  //   }
  // }


  // send() {
  //   let message = this.strctureForm.value.message;
  //   this.strctureForm.patchValue({ message: "" });
  //   this.question = message;
  //   this.isSearching = true

  //   let userId = this.currentUser?.userid;

  //   this.chatService.callChatApi({ q: message, userid: this.currentUser?.userid, source: "sql" }).subscribe(
  //     (response: any) => {
  //       this.answer = response.answer;
  //       this.isSearching = false;
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       alert("Something went wrong!");
  //       this.isSearching = false;
  //     }
  //   );

  // }
  currentUser: any = null;
  selectedImage: File | null = null;

  constructor(private chatService: ChatService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    let user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  onSubmit() {
    if (this.selectedImage) {
      // Handle image submission
      // For example, you can call a service to upload the image here
      console.log('Image submitted:', this.selectedImage);
  
      // Show snackbar
      this._snackBar.open('Image uploaded successfully', 'Close', {
        duration: 2000, // Duration in milliseconds
      });
  
      // Reset selectedImage after submission
      this.selectedImage = null;
    } else {
      alert('Please select an image to upload.');
    }
  }
  

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
}

