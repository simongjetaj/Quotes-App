import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import {
  faPlus,
  faQuoteLeft,
  faCopy,
  faAsterisk,
  faTimesCircle,
  faSearch,
  faEdit
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
  quote: Quote;
  showAddQuoteForm: boolean = false;
  errorMsgOnEditQuote: boolean = false;
  @ViewChild('closeModalBtn') closeModalBtn: ElementRef;

  faPlus = faPlus;
  faQuoteLeft = faQuoteLeft;
  faCopy = faCopy;
  faAsterisk = faAsterisk;
  faTimesCircle = faTimesCircle;
  faSearch = faSearch;
  faEdit = faEdit;

  constructor(
    private quoteService: QuoteService,
    private flashMsgService: FlashMsgService
  ) { }

  ngOnInit() {
    this.quoteService
      .getQuotes()
      .subscribe(
        quotes => (this.quotes = quotes),
        err =>
          this.flashMsgService.displayFlashMessage(
            `${err}`,
            "alert alert-danger text-danger",
            4000,
            "/"
          )
      );
  }

  addQuote(quote: Quote) {
    if (!quote.author) {
      quote.author = "Unknown";
    }
    this.quoteService.newQuote(quote);
    this.showAddQuoteForm = false;
  }

  deleteQuote(quoteId: string) {
    this.quoteService.deleteQuote(quoteId);
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

    if (!searchedText) {
      this.changeCategory("all");
    } else {
      this.quotes = this.quotes.filter(
        (q: Quote) =>
          q.quote.toLowerCase().includes(searchedText) ||
          q.author.toLowerCase().includes(searchedText)
      );
    }
  }

  changeCategory(cat) {
    this.quoteService
      .getQuotesByCategory(cat)
      .subscribe(quotes => (this.quotes = quotes));
  }

  onEditQuote(quote: Quote) {
    this.quote = quote;
  }

  editQuote(quote: Quote) {
    if (!quote.quote || !quote.author || !quote.cat) {
      this.errorMsgOnEditQuote = true;
    } else {
      this.quoteService.updateQuote(quote.id, quote);
      const btnElement: HTMLElement = this.closeModalBtn.nativeElement as HTMLElement;
      btnElement.click();
    }
  }
}