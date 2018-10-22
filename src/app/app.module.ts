import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { HttpModule } from "@angular/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Angular Fire imports
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { firebaseConfig } from "../environment";

// Service imports
import { QuoteService } from "./services/quote.service";

// Component imports
import { AppComponent } from "./app.component";
import { QuotesComponent } from "./components/quotes/quotes.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AddQuoteComponent } from "./components/add-quote/add-quote.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ApiQuotesComponent } from "./components/api-quotes/api-quotes.component";

const appRoutes: Routes = [
  { path: "", component: QuotesComponent },
  { path: "api", component: ApiQuotesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    NavbarComponent,
    AddQuoteComponent,
    SidebarComponent,
    ApiQuotesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule,
    FontAwesomeModule
  ],
  providers: [AngularFireDatabase, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
