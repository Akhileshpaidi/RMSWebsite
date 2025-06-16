import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommonAssesmentRulesComponent } from './view-common-assesment-rules.component';

describe('ViewCommonAssesmentRulesComponent', () => {
  let component: ViewCommonAssesmentRulesComponent;
  let fixture: ComponentFixture<ViewCommonAssesmentRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommonAssesmentRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommonAssesmentRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
