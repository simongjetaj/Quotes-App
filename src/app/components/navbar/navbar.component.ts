import { Component, OnInit } from '@angular/core';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faQuoteLeft = faQuoteLeft;
  faQuoteRight = faQuoteRight;

  constructor() { }

  ngOnInit() {
  }

}
