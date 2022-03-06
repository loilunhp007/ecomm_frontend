import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlNhanvienComponent } from './ql-nhanvien.component';

describe('QlNhanvienComponent', () => {
  let component: QlNhanvienComponent;
  let fixture: ComponentFixture<QlNhanvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlNhanvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlNhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
