import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faAsterisk, faQuoteLeft, faEyeSlash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
  faPlusCircle = faPlusCircle;
  faQuoteLeft = faQuoteLeft;

  constructor(
    private apiService: ApiService,
    public quoteService: QuoteService,
    private flashMsgService: FlashMsgService
  ) { }

  ngOnInit() {
    this.apiService.getApiQuotes().subscribe(apiQuotes => {
      apiQuotes.map(q => q.showApiQuote = true)
      this.apiQuotes = apiQuotes;
      // console.log(this.apiQuotes);
    });
  }

  addApiQuote(quote: Quote) {
    quote.createdAt = -(+new Date());

    this.quoteService.newQuote(quote);
    this.flashMsgService.displayFlashMessage('New quote from api added successfully!', 'alert alert-success text-center', 4000, '/');
  }

  hideApiQuote(apiQuote) {
    apiQuote.showApiQuote = false;
    // console.log(apiQuote);
  }
}
