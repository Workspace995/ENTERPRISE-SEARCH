import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  dateFilterDisplay = false;

  filtersAvailable = false;

  filters: any[] = [{
    name: "Sources",
    fieldname: "source",
    filterables: [],
    selected: [],
    display: false
  },
    {
      name: "Sponsor",
      fieldname: "Sponsor",
      filterables: [],
      selected: [],
      apiData: true
    }
    
  ]

  searchQuery: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private filterService: FilterService) { 
    this.router.events
       .subscribe((event: any) => {
         if (event instanceof NavigationEnd  || event?.routerEvent instanceof NavigationEnd) {
           let initialParams = this.activatedRoute.snapshot.queryParams;
           this.setDefaultValues(initialParams);
         }
       }); 
   }

   ngOnInit() {
     
   }


   isChecked(filterable: any, filter: any) {
    return filter.selected.findIndex((x: any) => x == filterable.key) > -1
   }
 
  setDefaultValues(params: any) {
    this.searchQuery = params.q;
    this.filtersAvailable = false;
    for (let index = 0; index < this.filters.length; index++) {
      this.filters[index].selected = [];
      const filter = this.filters[index];
      if(params[filter.fieldname]) {
        this.filters[index].selected = params[filter.fieldname].split(",")
        this.addSelectedDataToFilterables(index);
      }
      if(filter.apiData) {
        this.filterService.fetchAggregation(params, filter.fieldname).then((aggregation) => {
          this.filters[index].filterables = aggregation;
          if(params[filter.fieldname]) {
            this.filters[index].selected = params[filter.fieldname].split(",")
          } else {
            this.filters[index].selected = [];
          }  
          this.addSelectedDataToFilterables(index);

          if(this.filters[index].filterables.length > 0) {
            this.filtersAvailable = true;
          }
        })
      }
      
      if(this.filters[index].name == "Sources") {
        this.dateFilterDisplay = this.filters[index].selected.indexOf("active-grants") > -1 || this.filters[index].selected.length == 0;
      }
    }
   
  }

  addSelectedDataToFilterables(index: number) {
    let keyArray = this.filters[index].filterables.map((item: any) => item.key);
    this.filters[index].selected.forEach((selected: any) => {
      if(keyArray.findIndex((val: any) => val == selected) < 0) {
        this.filters[index].filterables.push({key: selected})
      }
    });
  }

  valueUpdated(filter: any, $event: any) {
    let values = $event;
    let index = this.filters.findIndex(x => x.fieldname == filter.fieldname);
    let list = values.map((val: any) => val.key)
    this.filters[index].selected = list;
    // let valueIndex = this.filters[index].selected.indexOf(target.value);
    // if(target.checked) {
    //   if(valueIndex < 0) {
    //     this.filters[index].selected.push(target.value);
    //   }
    // } else {
    //   this.filters[index].selected.splice(valueIndex, 1);
    // }
    this.applyFilterAndNavigate()
  }

  clearFilters() {
    this.filters.forEach((item) => {
      item.selected = []
        
    })
    this.applyFilterAndNavigate();
  }

  applyFilterAndNavigate() {
    let params: any = {};
    this.filters.forEach((item) => {
      if(item.selected.length !=0){
        params[item.fieldname] = item.selected.join(",");
      }
        
    })
    if(this.searchQuery) {
      params["q"] = this.searchQuery;
    }
    this.router.navigate([], { queryParams: params });
  }


  isImageUploadPopupOpen: boolean = false;

  openImageUploadPopup() {
    this.isImageUploadPopupOpen = true;
  }

  closeImageUploadPopup() {
    this.isImageUploadPopupOpen = false;
  }
 
}
