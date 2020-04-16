import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvertismentComponent } from './admin-advertisment.component';

describe('AdminAdvertismentComponent', () => {
  let component: AdminAdvertismentComponent;
  let fixture: ComponentFixture<AdminAdvertismentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdvertismentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
