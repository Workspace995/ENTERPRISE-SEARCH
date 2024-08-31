import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0, transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class ChatComponent {
  @ViewChild('chatBody') private chatBody!: ElementRef;

  displayChatWindow = false;
  currentUser: any = null;
  isSearching = false;

  messages: any = [];
  chatForm = new FormGroup({
    message: new FormControl('')
  });

  constructor(private http: HttpClient,  private chatService: ChatService) {

  }

  scrollToBottom(): void {
    try {
      console.log(this.chatBody.nativeElement.scrollHeight)
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight + 200;
    } catch (err) { }
  }

  ngOnInit() {
    let user = localStorage.getItem("user");
    if(user) {
      this.currentUser = JSON.parse(user);
    }
  }


  send() {
    this.scrollToBottom();
    let message = this.chatForm.value.message;
    this.chatForm.patchValue({ message: "" });
    this.messages.push({
      type: "user",
      text: message
    });
    this.isSearching = true

    let userId = this.currentUser?.userid;

    this.chatService.callChatApi({query: message, userid: this.currentUser?.userid, source: "s3" }).subscribe(
      (response: any) => {
        this.messages.push({
          type: "system",
          text: response.answer
        });
        this.isSearching = false;
      },
      (error) => {
        console.error('Error:', error);
        alert("Something went wrong!");
        this.isSearching = false;
      }
    );
    //After response

  }
}
