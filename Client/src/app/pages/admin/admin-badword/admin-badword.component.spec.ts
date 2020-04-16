import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBadwordComponent } from './admin-badword.component';

describe('AdminBadwordComponent', () => {
  let component: AdminBadwordComponent;
  let fixture: ComponentFixture<AdminBadwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBadwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBadwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
