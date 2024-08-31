import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenfdaComponent } from './openfda.component';

describe('OpenfdaComponent', () => {
  let component: OpenfdaComponent;
  let fixture: ComponentFixture<OpenfdaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenfdaComponent]
    });
    fixture = TestBed.createComponent(OpenfdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
