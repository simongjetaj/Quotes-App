import { Component, OnInit } from "@angular/core";

import { ApiService } from "../../services/api.service";
import { FlashMsgService } from "../../services/flash-msg.service";

import { Quote } from "../../models/Quote";

@Component({
  selector: "app-api-quotes",
  templateUrl: "./api-quotes.component.html",
  styleUrls: ["./api-quotes.component.css"]
})
export class ApiQuotesComponent implements OnInit {
  apiQuotes: Quote[];

  constructor(
    private apiService: ApiService,
    private flashMsgService: FlashMsgService
  ) {}

  ngOnInit() {
    this.apiService.getApiQuotes().subscribe(apiQuotes => {
      this.apiQuotes = apiQuotes;
      //console.log(this.apiQuotes);
    });
  }
}
