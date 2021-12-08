import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { FlashMsgService } from "./flash-msg.service";

import { Quote } from "../models/Quote";

@Injectable({
  providedIn: "root"
})
export class QuoteService {
  private quotesCollection: AngularFirestoreCollection<Quote>;
  quotes: Observable<Quote[]>;
  constructor(
    private readonly afs: AngularFirestore,
    private readonly flashMsgService: FlashMsgService
  ) {
    this.quotesCollection = afs.collection<Quote>("quotes", ref =>
      ref.orderBy("createdAt", "desc")
    );
    this.quotes = this.getData();
  }

  getQuotes() {
    return this.quotes;
  }

  newQuote(quote: Quote) {
    this.quotesCollection
      .add(quote)
      .then(() =>
        this.flashMsgService.displayFlashMessage(
          "New quote added successfully!",
          "alert alert-success text-center",
          3000,
          "/"
        )
      )
      .catch(err =>
        this.flashMsgService.displayFlashMessage(
          err,
          "alert alert-danger text-center",
          3000,
          "/"
        )
      );
  }

  deleteQuote(quoteId: string) {
    this.quotesCollection
      .doc(quoteId)
      .delete()
      .then(() =>
        this.flashMsgService.displayFlashMessage(
          "Quote deleted successfully!",
          "alert alert-success text-center",
          2000,
          "/"
        )
      )
      .catch(err =>
        this.flashMsgService.displayFlashMessage(
          err,
          "alert alert-danger text-center",
          3000,
          "/"
        )
      );
  }

  updateQuote(quoteId: string, quote: Quote) {
    this.quotesCollection.doc(quoteId).update(quote).then(() =>
      this.flashMsgService.displayFlashMessage(
        "Quote updated successfully!",
        "alert alert-success text-center",
        2000,
        "/"
      )
    )
      .catch(err =>
        this.flashMsgService.displayFlashMessage(
          err,
          "alert alert-danger text-center",
          3000,
          "/"
        )
      );
  }

  getQuotesByCategory(category: string) {
    if (category === "all") {
      this.quotesCollection = this.afs.collection<Quote>("quotes", ref =>
        ref.orderBy("createdAt", "desc")
      );
      return (this.quotes = this.getData());
    } else {
      this.quotesCollection = this.afs.collection<Quote>("quotes", ref =>
        ref.orderBy("createdAt", "desc").where("cat", "==", category)
      );
      return (this.quotes = this.getData());
    }
  }

  private getData() {
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.

    return this.quotesCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Quote;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
}
