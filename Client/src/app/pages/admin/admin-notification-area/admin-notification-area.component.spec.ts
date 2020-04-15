import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationAreaComponent } from './admin-notification-area.component';

describe('AdminNotificationAreaComponent', () => {
  let component: AdminNotificationAreaComponent;
  let fixture: ComponentFixture<AdminNotificationAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotificationAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
