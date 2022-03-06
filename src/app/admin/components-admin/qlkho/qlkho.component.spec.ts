import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlkhoComponent } from './qlkho.component';

describe('QlkhoComponent', () => {
  let component: QlkhoComponent;
  let fixture: ComponentFixture<QlkhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlkhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
