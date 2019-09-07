import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { ApiQuote } from '../models/ApiQuote';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApiQuotes() {
    return this.http.get<ApiQuote[]>('/quotes').pipe(
      retry(3) // retry a failed request up to 3 times
    );
  }
}
