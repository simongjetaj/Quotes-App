import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Quote } from "../models/Quote";

@Injectable({
  providedIn: "root"
})
export class QuoteService {
  itemsRef: AngularFireList<any>;
  itemRef: AngularFireObject<any>;
  quotes: Observable<any[]>;
  quote: Observable<any>;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.itemsRef = angularFireDatabase.list("quotes", ref =>
      ref.orderByChild("createdAt")
    );

    // Use snapshotChanges().map() to store the key and the other quote data
    this.quotes = this.itemsRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getQuotes(): Observable<any> {
    return this.quotes;
  }

  newQuote(quote: Quote): void {
    this.itemsRef.push(quote);
  }
}
