import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  OperatorFunction,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  Subscription,
  tap,
} from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { MenuService } from 'src/app/services/menu.service'; // Import MenuService

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  searching: boolean = false;
  searchFailed: boolean = false;
  params: any = {};
  currentUser: any = null;
  activeTab: string = 'ALL'; // Default to "ALL"
  allTabs: Array<{ name: string; label: string; active: boolean }> = [];
  menuSubscription: Subscription | null = null; // Subscription to track menu items

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpServiceService,
    private chatService: ChatService,
    private menuService: MenuService // Inject MenuService
  ) {
    // Subscribe to query parameter changes
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.params = Object.assign({}, params);
      const searchTab = this.allTabs.find((tab) => tab.name === params.source);
      this.activeTab = searchTab ? searchTab.label : 'ALL'; // Set to "ALL" if no specific source
      this.searchForm.patchValue({ query: this.params.question });
    });
  }

  ngOnInit(): void {
    // Subscribe to menu items from the MenuService
    this.menuSubscription = this.menuService.menuItems$.subscribe((menuItems) => {
      this.allTabs = menuItems.map((item) => ({
        name: item.name,
        label: item.label,
        active: true,
      }));
    });
  }

  ngOnDestroy(): void {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }

  typeahead: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.httpService.autocomplete(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  search() {
    this.searching = true;
    this.featuredAnswer();
  }

  updateRoute(query: string) {
    this.params['q'] = query;
    this.params['question'] = this.searchForm.value.query;
    this.params['source'] =
      this.activeTab === 'ALL' ? this.getActiveTabs().join(',') : this.activeTab;
    this.router.navigate([], { queryParams: this.params });
    this.searching = false;
  }

  featuredAnswer() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    if (this.searchForm.value.query) {
      this.updateRoute(this.searchForm.value.query);
    }
    // Uncomment the following code if you want to call the AI API
    // this.chatService.callAiApi({ query: this.searchForm.value.query, userid: this.currentUser?.userid, source: this.activeTab }).subscribe((response: any) => {
    //   localStorage.setItem("search", JSON.stringify(response));
    //   this.updateRoute(response?.keywords?.join(" "));
    // }, err => this.searching = false);
  }

  // Helper method to get all active tabs for "All" functionality
  getActiveTabs(): string[] {
    return this.allTabs.filter((tab) => tab.active).map((tab) => tab.name);
  }
}
