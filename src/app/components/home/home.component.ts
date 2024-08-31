import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedSource : string = "";

  constructor(private activatedRoute: ActivatedRoute){
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
    this.selectedSource = params.source;
  });
  }

}
