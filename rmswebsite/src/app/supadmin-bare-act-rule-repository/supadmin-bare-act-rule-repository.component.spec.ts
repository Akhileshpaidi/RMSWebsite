import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminBareActRuleRepositoryComponent } from './supadmin-bare-act-rule-repository.component';

describe('SupadminBareActRuleRepositoryComponent', () => {
  let component: SupadminBareActRuleRepositoryComponent;
  let fixture: ComponentFixture<SupadminBareActRuleRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminBareActRuleRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminBareActRuleRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
