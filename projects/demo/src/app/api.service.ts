import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchPlanets(apiUrl?: string): Observable<any> {
    const url = apiUrl || 'https://swapi.dev/api/planets/?page=1';
    return this.http.get(url);
  }
}
