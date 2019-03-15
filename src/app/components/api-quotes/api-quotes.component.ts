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
import { ApiQuote } from "../../models/ApiQuote";

@Component({
  selector: "app-api-quotes",
  templateUrl: "./api-quotes.component.html",
  styleUrls: ["./api-quotes.component.css"]
})
export class ApiQuotesComponent implements OnInit {
  apiQuotes: ApiQuote[];
  quote: Quote = {
    quote: "",
    author: "",
    cat: "",
    createdAt: 0
  };

  faAsterisk = faAsterisk;
  faEyeSlash = faEyeSlash;
  faQuoteLeft = faQuoteLeft;
  faSave = faSave;

  constructor(
    private apiService: ApiService,
    public quoteService: QuoteService,
    private flashMsgService: FlashMsgService
  ) { }

  ngOnInit() {
    this.apiService.getApiQuotes().subscribe(
      apiQuotes => {
        apiQuotes.map(q => q.showApiQuote = true);
        this.apiQuotes = apiQuotes;
      },
      () =>
        this.flashMsgService.displayFlashMessage(
          "An error occurred, please try again later!",
          "alert alert-danger text-danger",
          4000,
          "/api"
        )
    );
  }

  addApiQuote(event, quote: ApiQuote) {
    event.srcElement.innerHTML = "Saving...";
    event.target.classList.add("lightBackground");

    this.quote.quote = quote.content;
    this.quote.author = quote.title;
    this.quote.cat = 'API';
    this.quote.createdAt = +new Date();
    this.quoteService.newQuote(this.quote);
  }

  hideApiQuote(apiQuote) {
    apiQuote.showApiQuote = false;
  }
}
