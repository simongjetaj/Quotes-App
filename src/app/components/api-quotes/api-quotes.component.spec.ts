import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiQuotesComponent } from './api-quotes.component';

describe('ApiQuotesComponent', () => {
  let component: ApiQuotesComponent;
  let fixture: ComponentFixture<ApiQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
