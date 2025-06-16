import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleRepositoryComponent } from './rule-repository.component';

describe('RuleRepositoryComponent', () => {
  let component: RuleRepositoryComponent;
  let fixture: ComponentFixture<RuleRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
