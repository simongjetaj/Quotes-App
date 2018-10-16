import { Component, OnInit } from "@angular/core";
import { QuoteService } from "../../services/quote.service";
import { Quote } from "../../models/Quote";

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.css"]
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];

  constructor(public quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getQuotes().subscribe(quotes => {
      this.quotes = quotes;
      // console.log(this.quotes);
    });
  }
}
