import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencySkillLevelComponent } from './competency-skill-level.component';

describe('CompetencySkillLevelComponent', () => {
  let component: CompetencySkillLevelComponent;
  let fixture: ComponentFixture<CompetencySkillLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetencySkillLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetencySkillLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
