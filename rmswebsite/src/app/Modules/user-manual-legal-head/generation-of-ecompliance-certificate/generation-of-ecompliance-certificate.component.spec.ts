import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationOfEcomplianceCertificateComponent } from './generation-of-ecompliance-certificate.component';

describe('GenerationOfEcomplianceCertificateComponent', () => {
  let component: GenerationOfEcomplianceCertificateComponent;
  let fixture: ComponentFixture<GenerationOfEcomplianceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationOfEcomplianceCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerationOfEcomplianceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
