import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private createDataSourceUrl = environment.createDataSourceApi;
  private listDataSourceUrl = environment.listDataSourceApi;
  private updateDataSourceUrl = environment.updateDataSourceApi;
  private deleteDataSourceUrl = environment.deleteDataSourceApi;

  private SourcesMenu: Array<{ name: string, label: string }> = [
    // { name: 'patent-data', label: 'Patent Data' },
  ];


  private menuItemsSubject = new BehaviorSubject<Array<{ name: string, label: string }>>(this.SourcesMenu);


  menuItems$ = this.menuItemsSubject.asObservable();


  constructor(private http: HttpClient) {

    this.fetchAndAddDataSources();
  }


  getMenuItems(): Observable<Array<{ name: string, label: string }>> {
    return this.menuItems$;
  }


  addMenuItem(item: { name: string, label: string }): void {
    const currentMenuItems = this.menuItemsSubject.getValue();
    if (!currentMenuItems.some(existingItem => existingItem.name === item.name)) {

      this.menuItemsSubject.next([...currentMenuItems, item]);
    }
  }

  // Fetch data sources for "More Options"
  getDataSources(): Observable<any[]> {
    return this.http.get<any>(this.listDataSourceUrl).pipe(
      map(response => {
        console.log('Fetched data sources:', response);


        const dataSources = response.body?.DataSources || [];


        return dataSources.map((source: any) => ({
          sourceName: source.sourceName || source.Name,
          labelName: source.labelName || source.Label || 'Unknown Label'
        }));
      }),
      catchError(error => {
        console.error('Error fetching data sources:', error);
        return of([]);
      })
    );
  }

  // Add a new data source
  addDataSource(name: string, label: string, createdBy: string): Observable<any> {
    const payload = {
      sourceName: name,
      labelName: label,
      created_by: createdBy,
      created_time: new Date().toISOString()
    };

    return this.http.post(this.createDataSourceUrl, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(() => {

        this.addMenuItem({ name, label });
      }),
      map(response => response),
      catchError(error => {
        console.error('Error adding data source:', error);
        return of({ error: true, message: 'Failed to add data source' });
      })
    );
  }

  // Update an existing data source
  updateDataSource(editData: {
    sourceName: string;
    labelName: string;
    updated_sourceName: string;
    updated_labelName: string;
    updated_created_by: string;
    updated_created_time: string;
  }): Observable<any> {
    const payload = {
      sourceName: editData.sourceName,
      labelName: editData.labelName,
      updated_sourceName: editData.updated_sourceName,
      updated_labelName: editData.updated_labelName,
      updated_by: editData.updated_created_by,
      updated_time: new Date().toISOString()
    };

    return this.http.post(this.updateDataSourceUrl, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('API Response:', response);
      }),
      catchError(error => {
        console.error('Error updating data source:', error);
        return of({ error: true, message: 'Failed to update data source' });
      })
    );
  }

  // Method to update an existing menu item
  updateMenuItem(oldName: string, updatedItem: { name: string, label: string }): void {
    let currentMenuItems = this.menuItemsSubject.getValue();
    currentMenuItems = currentMenuItems.map(item =>
      item.name === oldName ? updatedItem : item
    );
    this.menuItemsSubject.next(currentMenuItems);
  }

  deleteDataSource(sourceName: string, labelName: string): Observable<any> {
    const payload = { sourceName, labelName };

    return this.http.post(this.deleteDataSourceUrl, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error deleting data source:', error);
        return of({ error: true, message: 'Failed to delete data source' });
      })
    );
  }

  // Method to fetch and add data sources to the menu
  private fetchAndAddDataSources(): void {
    this.getDataSources().subscribe(dataSources => {
      dataSources.forEach(dataSource => this.addMenuItem(dataSource));
    });
  }
}
