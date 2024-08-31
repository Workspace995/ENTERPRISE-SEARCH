import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantDetailsPopupComponent } from './grant-details-popup.component';

describe('GrantDetailsPopupComponent', () => {
  let component: GrantDetailsPopupComponent;
  let fixture: ComponentFixture<GrantDetailsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrantDetailsPopupComponent]
    });
    fixture = TestBed.createComponent(GrantDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
