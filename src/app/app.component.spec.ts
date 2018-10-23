import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { exec } from 'child_process';

// only run these test => 'fdescribe'
fdescribe('AppComponent', () => {
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //   }).compileComponents();
  // }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'quotes-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('quotes-app');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to quotes-app!');
  // });

  let expected = '';
  let expectMatch = null;

  // init vars so we can use on multiple tests 
  beforeEach((() => {
    expected = 'apptestada';
    expectMatch = new RegExp(/^hello/);
  }));

  // clean expected variable
  afterEach(() => {
    expected = '';
  });


  it('checks if apptest is not apptest',
    () => expect('apptest').not.toBe(expected)
  );

  it('checks if apptest starts with hello',
    () => expect('hello Simon').toMatch(expectMatch)
  );
});
