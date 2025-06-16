import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAdminContDependComponent } from './risk-admin-cont-depend.component';

describe('RiskAdminContDependComponent', () => {
  let component: RiskAdminContDependComponent;
  let fixture: ComponentFixture<RiskAdminContDependComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskAdminContDependComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAdminContDependComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
