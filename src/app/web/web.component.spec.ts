import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WebComponent } from './web.component';

describe('WebComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        WebComponent
      ],
    }).compileComponents();
  });

  it('should create the Web', () => {
    const fixture = TestBed.createComponent(WebComponent);
    const Web = fixture.componentInstance;
    expect(Web).toBeTruthy();
  });

  it(`should have as title 'Clothing-store'`, () => {
    const fixture = TestBed.createComponent(WebComponent);
    const Web = fixture.componentInstance;
    expect(Web.title).toEqual('Clothing-store');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WebComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Clothing-store Web is running!');
  });
});
