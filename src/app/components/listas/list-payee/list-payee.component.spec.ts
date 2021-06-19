import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayeeComponent } from './list-payee.component';

describe('ListPayeeComponent', () => {
  let component: ListPayeeComponent;
  let fixture: ComponentFixture<ListPayeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
