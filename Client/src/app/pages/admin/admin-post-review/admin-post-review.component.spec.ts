import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostReviewComponent } from './admin-post-review.component';

describe('AdminPostReviewComponent', () => {
  let component: AdminPostReviewComponent;
  let fixture: ComponentFixture<AdminPostReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
