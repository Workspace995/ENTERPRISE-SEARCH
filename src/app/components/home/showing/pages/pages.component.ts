import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  params: any;
  @Input() total: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.params = Object.assign({}, params);
    });
  }

  next() {
    let currentPage = this.params.page ? parseInt(this.params.page) : 1;
    this.params.page = 20*(currentPage) < this.total.value ? currentPage+1 : currentPage;
    this.updateRoute();
  }

  prev() {
    let currentPage = parseInt(this.params.page);
    this.params.page = currentPage > 1 ? currentPage-1 : 1
    this.updateRoute();
  }

  updateRoute() {
    this.router.navigate([], { queryParams: this.params });
  }
}
