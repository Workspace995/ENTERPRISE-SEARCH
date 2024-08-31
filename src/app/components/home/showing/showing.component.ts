import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-showing',
  templateUrl: './showing.component.html',
  styleUrls: ['./showing.component.css']
})
export class ShowingComponent {
  result: any;
  queryParams: any;
  params: any
  constructor(private router: Router, private search: HttpServiceService, private activatedRoute: ActivatedRoute) {
    this.router.events
       .subscribe((event: any) => {
         if (event instanceof NavigationEnd || event?.routerEvent instanceof NavigationEnd) {

           let initialParams = this.activatedRoute.snapshot.queryParams;
           this.queryParams = initialParams;
            this.getDataFromApi(initialParams);
         }
       });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.params = params;
    });

  }

  getDataFromApi(params: any) {
    // Use HttpClient to make the GET request with headers
    this.search.searchFromApi(params).subscribe(
      (response: any) => {
        this.result = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
