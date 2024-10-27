import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDelModalComponent } from './user-del-modal.component';

describe('UserDelModalComponent', () => {
  let component: UserDelModalComponent;
  let fixture: ComponentFixture<UserDelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
