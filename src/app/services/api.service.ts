import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(public http: Http) { }

  getApiQuotes() {
    return this.http.get("https://talaikis.com/api/quotes/").pipe(
      map(res => {
        return res.json();
      })
    );
  }
}
