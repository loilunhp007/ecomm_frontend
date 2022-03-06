import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlSanphamComponent } from './ql-sanpham.component';

describe('QlSanphamComponent', () => {
  let component: QlSanphamComponent;
  let fixture: ComponentFixture<QlSanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlSanphamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlSanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
