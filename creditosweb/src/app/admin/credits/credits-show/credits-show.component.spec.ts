import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsShowComponent } from './credits-show.component';

describe('CreditsShowComponent', () => {
  let component: CreditsShowComponent;
  let fixture: ComponentFixture<CreditsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditsShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
