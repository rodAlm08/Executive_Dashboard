import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://zerofourtwo.net/api/';

  constructor(private http: HttpClient) {}

  getTestData(): Observable<any> {
    // Make a GET request
    return this.http.get<any>(this.baseUrl+ "dataset");
  }

 

  sendData(data: any) {
    return this.http.post(this.baseUrl+ "ai", data);
  }

  syncData(): Observable<any> {
    
    return this.http.get<any>(this.baseUrl+ "dataset");
  }
  
  
}
