import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlDonhangComponent } from './ql-donhang.component';

describe('QlDonhangComponent', () => {
  let component: QlDonhangComponent;
  let fixture: ComponentFixture<QlDonhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlDonhangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlDonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
