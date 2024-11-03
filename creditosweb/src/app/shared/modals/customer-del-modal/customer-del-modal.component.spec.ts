import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDelModalComponent } from './customer-del-modal.component';

describe('CustomerDelModalComponent', () => {
  let component: CustomerDelModalComponent;
  let fixture: ComponentFixture<CustomerDelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
