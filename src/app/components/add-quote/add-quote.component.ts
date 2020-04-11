import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FlashMsgService } from '../../services/flash-msg.service';

import { Quote } from '../../models/Quote';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  @Output()
  quoteAdded = new EventEmitter<Quote>();

  quote: Quote = {
    quote: '',
    author: '',
    cat: '',
    createdAt: 0
  };

  constructor(private flashMsgService: FlashMsgService) {}

  ngOnInit() {}

  onAddQuote({ value, valid }: { value: Quote; valid: boolean }) {
    if (!valid) {
      this.flashMsgService.displayFlashMessage(
        'Please, fill in all fields!',
        'alert alert-danger text-center',
        4000,
        '/'
      );
    } else {
      /*
       * emitting the data from this component, so we can can have a better communication and component structure
       * I wanted the quotes component to be responsible to add a quote
       * I wanted to hide the form and this was the way to access the showAddQuoteForm property
       */
      value.cat = value.cat.toLowerCase().trim();
      value.createdAt = +new Date();
      this.quoteAdded.emit(value);
    }
  }
}
