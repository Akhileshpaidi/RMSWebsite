import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListRiskStatementComponent } from './view-list-risk-statement.component';

describe('ViewListRiskStatementComponent', () => {
  let component: ViewListRiskStatementComponent;
  let fixture: ComponentFixture<ViewListRiskStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewListRiskStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListRiskStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
