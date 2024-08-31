import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatefiltersComponent } from './datefilters.component';

describe('DatefiltersComponent', () => {
  let component: DatefiltersComponent;
  let fixture: ComponentFixture<DatefiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatefiltersComponent]
    });
    fixture = TestBed.createComponent(DatefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
