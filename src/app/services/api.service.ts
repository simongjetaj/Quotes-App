import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { retry } from 'rxjs/operators';

import { Quote } from "../models/Quote";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getApiQuotes() {
    return this.http.get<Quote[]>("https://talaikis.com/api/quotes/").pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }
}
