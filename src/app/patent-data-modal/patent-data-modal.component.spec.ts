import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentDataModalComponent } from './patent-data-modal.component';

describe('PatentDataModalComponent', () => {
  let component: PatentDataModalComponent;
  let fixture: ComponentFixture<PatentDataModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatentDataModalComponent]
    });
    fixture = TestBed.createComponent(PatentDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
