import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from '../../models/Quote';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  quotes: Quote[];
  categories: string[];
  @Output()
  categoryChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.categories = Array.from(
      new Set(this.quotes.map(c => c.cat))
    );
  }

  changeCategory(category: string) {
    this.categoryChanged.emit(category);
  }
}
