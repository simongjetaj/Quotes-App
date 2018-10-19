import { Component, OnInit } from "@angular/core";
import {
  faPlus,
  faQuoteLeft,
  faCopy,
  faAsterisk
} from "@fortawesome/free-solid-svg-icons";

import { QuoteService } from "../../services/quote.service";
import { FlashMsgService } from "../../services/flash-msg.service";
import { Quote } from "../../models/Quote";

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.css"]
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];
  showAddQuoteForm: boolean = false;
  faPlus = faPlus;
  faQuoteLeft = faQuoteLeft;
  faCopy = faCopy;
  faAsterisk = faAsterisk;
  filteredQuotes: Quote[];

  constructor(
    private quoteService: QuoteService,
    private flashMsgService: FlashMsgService
  ) {}

  ngOnInit() {
    this.quoteService.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
      this.filteredQuotes = this.quotes;
      // console.log(this.quotes);
    });
  }

  addQuote(quote: Quote) {
    if (!quote.author) {
      quote.author = "Unknown";
    }
    this.quoteService.newQuote(quote);
    this.showAddQuoteForm = false;
    this.flashMsgService.displayFlashMessage(
      "New quote added successfully!",
      "alert alert-success text-center",
      4000,
      "/"
    );
  }

  toggleAddQuoteForm() {
    this.showAddQuoteForm = !this.showAddQuoteForm;
  }

  copyQuote(quote: string, author: string) {
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = `"${quote}" \n\n(Author: ${author})`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    this.flashMsgService.displayFlashMessage(
      "Quote copied successfully!",
      "alert alert-success text-center",
      2000,
      "/"
    );
  }

  filterQuotes(searchedText: string) {
    searchedText = searchedText.toLowerCase().trim();

    this.filteredQuotes = this.quotes.filter(
      (q: Quote) =>
        q.quote.toLowerCase().indexOf(searchedText) > -1 ||
        q.author.toLowerCase().indexOf(searchedText) > -1
    );
  }
}
