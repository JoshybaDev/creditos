import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NofondpublicComponent } from './nofondpublic.component';

describe('NofondpublicComponent', () => {
  let component: NofondpublicComponent;
  let fixture: ComponentFixture<NofondpublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NofondpublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NofondpublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
