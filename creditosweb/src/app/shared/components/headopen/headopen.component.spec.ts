import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadopenComponent } from './headopen.component';

describe('HeadopenComponent', () => {
  let component: HeadopenComponent;
  let fixture: ComponentFixture<HeadopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadopenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
