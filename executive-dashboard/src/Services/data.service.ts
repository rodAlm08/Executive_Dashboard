import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://zerofourtwo.net/api/dataset';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    // Make a GET request
    return this.http.get<any>(this.baseUrl);
  }

  getTestData(): Observable<any> {
    return this.http.get<any>('/assets/test_data.json'); 
  }

  sendData(data: any) {
    
    const apiEndpoint = 'https://zerofourtwo.net/api/ai';
    return this.http.post(apiEndpoint, data);
  }

  
}
