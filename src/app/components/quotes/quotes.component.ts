import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {
  faPlus,
  faQuoteLeft,
  faCopy,
  faAsterisk,
  faTimesCircle,
  faSearch,
  faEdit,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

import { QuoteService } from '../../services/quote.service';
import { FlashMsgService } from '../../services/flash-msg.service';
import { Quote } from '../../models/Quote';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];
  quote: Quote;
  showAddQuoteForm = false;
  errorMsgOnEditQuote = false;
  loading = false;
  @ViewChild('closeModalBtn', { static: false }) closeModalBtn: ElementRef;

  faPlus = faPlus;
  faQuoteLeft = faQuoteLeft;
  faCopy = faCopy;
  faAsterisk = faAsterisk;
  faTimesCircle = faTimesCircle;
  faSearch = faSearch;
  faEdit = faEdit;
  faInfoCircle = faInfoCircle;

  constructor(
    private quoteService: QuoteService,
    private flashMsgService: FlashMsgService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.quoteService.getQuotes().subscribe({
      next: quotes => {
        this.quotes = quotes;
        this.loading = false;
      },
      error: (err) =>
        this.flashMsgService.displayFlashMessage(
          `${err}`,
          'alert alert-danger text-danger',
          4000,
          '/'
        )
      })
  }

  addQuote(quote: Quote) {
    if (!quote.author) {
      quote.author = 'Unknown';
    }

    this.quoteService.newQuote(quote);
    this.showAddQuoteForm = false;
  }

  deleteQuote(quote: Quote) {
    this.quoteService.deleteQuote(quote.id);
  }

  toggleAddQuoteForm() {
    this.showAddQuoteForm = !this.showAddQuoteForm;
  }

  copyQuote(quote: string, author: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `"${quote}" \n\n(Author: ${author})`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    navigator.clipboard.writeText(selBox.value);
    document.body.removeChild(selBox);
    this.flashMsgService.displayFlashMessage(
      'Quote copied successfully!',
      'alert alert-success text-center',
      2000,
      '/'
    );
  }

  filterQuotes(searchedText: string) {
    searchedText = searchedText.toLowerCase().trim();

    if (!searchedText) {
      this.changeCategory('all');
    } else {
      this.quotes = this.quotes.filter(
        (q: Quote) =>
          q.text.toLowerCase().includes(searchedText) ||
          q.author.toLowerCase().includes(searchedText)
      );
    }
  }

  changeCategory(cat: string) {
    this.quoteService
      .getQuotesByCategory(cat)
      .subscribe({
        next: quotes => this.quotes = quotes
      });
  }

  onEditQuote(quote: Quote) {
    this.quote = quote;
  }

  editQuote(quote: Quote, textValue: string, authorValue: string, categoryValue: string) {
    if (!textValue || !authorValue || !categoryValue) {
      this.errorMsgOnEditQuote = true;
    } else {
      this.errorMsgOnEditQuote = false;
      // reinitialize quote object values with the updated values of DOM elements
      quote.text = textValue;
      quote.author = authorValue;
      quote.cat = categoryValue;

      this.quoteService.updateQuote(quote.id, quote);

      // close modal
      this.closeModalBtn.nativeElement.click();
    }
  }

  stripHtml(html: string) {
    const temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = html;

    return temporalDivElement.textContent ?? temporalDivElement.innerText ?? '';
  }
}
