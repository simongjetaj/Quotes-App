import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { QuoteService } from '../../services/quote.service';
import { FlashMsgService } from '../../services/flash-msg.service';

import { Quote } from '../../models/Quote';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  @Output() quoteAdded = new EventEmitter<Quote>();

  quote: Quote = {
    quote: '',
    author: '',
    category: '',
    createdAt: ''
  }

  constructor(private quoteService: QuoteService, private flashMsgService: FlashMsgService) { }

  ngOnInit() {
  }

  onAddQuote({ value, valid }: { value: Quote, valid: boolean }) {
    if (!valid) {
      this.flashMsgService.displayFlashMessage('Please, fill in all fields!', 'alert alert-danger text-center', 4000, '/');
    } else {
      /* 
        * emitting the data from this component, so we can can have a better communication and component structure 
        * I wanted the quotes component to be responsible to add a quote
        * I wanted to hide the form and this was the way to access the showAddQuoteForm property 
      */
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1; //months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      let myDate = day + "-" + month + "-" + year;
      myDate.split("-");

      const newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2];
      value.createdAt = new Date(newDate).getTime().toString();
      this.quoteAdded.emit(value);
    }
  }

}
