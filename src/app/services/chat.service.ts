import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  callChatApi(requestBody: any) {
    let url = environment.chatUrl+"/bot";
    return this.http.post(url, requestBody);
  }

  callAiApi(requestBody: any) {
    let url = environment.chatUrl+"/llama2";
    return this.http.post(url, requestBody);
  }
}
