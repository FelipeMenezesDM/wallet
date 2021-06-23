import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPaymentComponent } from './auth-payment.component';

describe('AuthPaymentComponent', () => {
  let component: AuthPaymentComponent;
  let fixture: ComponentFixture<AuthPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
