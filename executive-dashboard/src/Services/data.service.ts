import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    // Make a GET request to your API endpoint
    return this.http.get<any>(this.baseUrl);
  }
}
