import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSingupComponent } from './signin-singup.component';

describe('SigninSingupComponent', () => {
  let component: SigninSingupComponent;
  let fixture: ComponentFixture<SigninSingupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninSingupComponent]
    });
    fixture = TestBed.createComponent(SigninSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
