import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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

const appRoutes: Routes = [{ path: "", component: QuotesComponent }];

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireDatabase, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule {}
