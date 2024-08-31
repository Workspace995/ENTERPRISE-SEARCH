import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-search-result',
  templateUrl: './top-search-result.component.html',
  styleUrls: ['./top-search-result.component.css']
})
export class TopSearchResultComponent {

  params: any; 
  currentUser: any = null;

  search: any;
  

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchResult()
    });
  }


  searchResult(){
    let searchStr = localStorage.getItem("search")
    if(searchStr) {
      this.search = JSON.parse(searchStr);   
    } else {
      this.search = null;
    }
  }

}
