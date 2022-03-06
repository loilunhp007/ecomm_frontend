import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlKhachhangComponent } from './ql-khachhang.component';

describe('QlKhachhangComponent', () => {
  let component: QlKhachhangComponent;
  let fixture: ComponentFixture<QlKhachhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlKhachhangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlKhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
