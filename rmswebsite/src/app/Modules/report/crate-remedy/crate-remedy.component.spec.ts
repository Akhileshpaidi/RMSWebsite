import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateRemedyComponent } from './crate-remedy.component';

describe('CrateRemedyComponent', () => {
  let component: CrateRemedyComponent;
  let fixture: ComponentFixture<CrateRemedyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrateRemedyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrateRemedyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
