import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlAccountComponent } from './ql-account.component';

describe('QlAccountComponent', () => {
  let component: QlAccountComponent;
  let fixture: ComponentFixture<QlAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
