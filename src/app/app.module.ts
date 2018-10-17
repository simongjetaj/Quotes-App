import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Angular Fire imports
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabase } from "@angular/fire/database";
import { firebaseConfig } from "../environment";

// Service imports
import { QuoteService } from "./services/quote.service";

// Component imports
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { QuotesComponent } from "./components/quotes/quotes.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const appRoutes: Routes = [{ path: "", component: DashboardComponent }];

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    DashboardComponent,
    NavbarComponent,
    AddQuoteComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AngularFireDatabase, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
