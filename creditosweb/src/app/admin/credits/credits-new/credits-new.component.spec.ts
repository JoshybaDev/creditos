import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsNewComponent } from './credits-new.component';

describe('CreditsNewComponent', () => {
  let component: CreditsNewComponent;
  let fixture: ComponentFixture<CreditsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
