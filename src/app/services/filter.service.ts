import { EventEmitter, Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private httpService: HttpServiceService) {
    
   }

  public fetchAggregation(params: any, fieldName: string) {
    let clonedParams = Object.assign({}, params);
    delete clonedParams[fieldName];
    return new Promise((resolve, reject) => {
      this.httpService.searchFromApi(clonedParams, 1, fieldName).subscribe((response: any) => {
        resolve(response.aggregations.response_codes.buckets);
      })

    });
  }
}
