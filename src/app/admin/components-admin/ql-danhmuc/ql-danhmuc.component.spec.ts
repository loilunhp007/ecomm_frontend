import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlDanhmucComponent } from './ql-danhmuc.component';

describe('QlDanhmucComponent', () => {
  let component: QlDanhmucComponent;
  let fixture: ComponentFixture<QlDanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlDanhmucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
