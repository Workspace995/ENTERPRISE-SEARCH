import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuerybuilderService } from './querybuilder.service';
import { MenuService } from './menu.service'; // Import MenuService

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  apiUrl = environment.apiURL;

  headers = new HttpHeaders({
    Authorization: 'Basic ' + environment.token,
  });

  options: any = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private query: QuerybuilderService,
    private menuService: MenuService // Inject MenuService
  ) {}

  autocomplete(term: string) {
    if (term === '') {
      return of([]);
    }
    let body = {
      suggest: {
        'Grantee Name-suggestions': {
          prefix: term,
          completion: {
            field: 'suggestions',
            size: 1,
          },
        },
      },
    };
    return this.http
      .post(this.apiUrl + '/active-grants/_search', body, this.options)
      .pipe(
        map((response: any) => {
          let strArr: any = [];
          let options =
            response.suggest['Grantee Name-suggestions'][0]['options'];
          if (options.length == 0) {
            return strArr;
          }
          let array = options[0]._source.suggestions;
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            strArr.push(element.input);
          }
          return strArr;
        })
      );
  }

  searchFromApi(filters: any, size: number = 20, aggsField: any = false) {
    let url = this.apiUrl + '/_search';
    let body = this.query.build(filters, size, aggsField);
    return this.http.post<any>(url, body, this.options);
  }

//   /**

//    * @returns An observable with the data for all active sources.
//    */
//   getDataForAllSources(): Observable<any> {
//     return this.menuService.getMenuItems().pipe(
//       switchMap(menuItems => {
//         // Extract source names from menu items
//         const sourceNames = menuItems.map(item => item.name);

//         // Create a query to match all sources
//         const body = {
//           query: {
//             bool: {
//               should: sourceNames.map(sourceName => ({
//                 match: { source: sourceName }
//               })),
//             }
//           }
//         };

//         // Make the API request
//         return this.http.post<any>(`${this.apiUrl}/_search`, body, this.options).pipe(
//           map(response => {
//             console.log('Data for all sources:', response);
//             return response;
//           }),
//           catchError(error => {
//             console.error('Error fetching data for all sources:', error);
//             return of({ error: true, message: 'Failed to fetch data' });
//           })
//         );
//       })
//     );
//   }
// }
}
