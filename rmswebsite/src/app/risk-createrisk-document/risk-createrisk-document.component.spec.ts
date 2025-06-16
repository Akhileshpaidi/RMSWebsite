import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCreateriskDocumentComponent } from './risk-createrisk-document.component';

describe('RiskCreateriskDocumentComponent', () => {
  let component: RiskCreateriskDocumentComponent;
  let fixture: ComponentFixture<RiskCreateriskDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCreateriskDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskCreateriskDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
