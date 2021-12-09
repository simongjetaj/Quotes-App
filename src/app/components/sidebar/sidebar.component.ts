import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Quote } from '../../models/Quote';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input()
  quotes: Quote[];
  categories: string[];
  @Output()
  categoryChanged = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.categories = [...new Set(this.quotes.map(c => c.cat))];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.categories = Array.from(
      new Set(changes.quotes.currentValue.map((q: Quote) => q.cat))
    );
  }

  changeCategory(category: string) {
    this.categoryChanged.emit(category);
  }
}
