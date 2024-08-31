import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchResultComponent } from './top-search-result.component';

describe('TopSearchResultComponent', () => {
  let component: TopSearchResultComponent;
  let fixture: ComponentFixture<TopSearchResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopSearchResultComponent]
    });
    fixture = TestBed.createComponent(TopSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
