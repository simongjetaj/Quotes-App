import { Component, OnInit } from "@angular/core";
import {
  faAsterisk,
  faQuoteLeft,
  faEyeSlash,
  faSave
} from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "../../services/api.service";
import { QuoteService } from "../../services/quote.service";
import { FlashMsgService } from "../../services/flash-msg.service";

import { Quote } from "../../models/Quote";

@Component({
  selector: "app-api-quotes",
  templateUrl: "./api-quotes.component.html",
  styleUrls: ["./api-quotes.component.css"]
})
export class ApiQuotesComponent implements OnInit {
  apiQuotes: Quote[];

  faAsterisk = faAsterisk;
  faEyeSlash = faEyeSlash;
  faQuoteLeft = faQuoteLeft;
  faSave = faSave;

  constructor(
    private apiService: ApiService,
    public quoteService: QuoteService,
    private flashMsgService: FlashMsgService
  ) {}

  ngOnInit() {
    this.apiService.getApiQuotes().subscribe(
      apiQuotes => {
        apiQuotes.map(q => (q.showApiQuote = true));
        this.apiQuotes = apiQuotes;
      },
      () =>
        this.flashMsgService.displayFlashMessage(
          "An error occurred, please try again later!",
          "alert alert-danger text-danger",
          4000,
          "/"
        )
    );
  }

  addApiQuote(event, quote: Quote) {
    event.srcElement.innerHTML = "Saving...";
    event.target.classList.add("lightBackground");
    quote.createdAt = +new Date();
    this.quoteService.newQuote(quote);
  }

  hideApiQuote(apiQuote) {
    apiQuote.showApiQuote = false;
  }
}
