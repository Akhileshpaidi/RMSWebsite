import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssControlAcceptCriteComponent } from './ass-control-accept-crite.component';

describe('AssControlAcceptCriteComponent', () => {
  let component: AssControlAcceptCriteComponent;
  let fixture: ComponentFixture<AssControlAcceptCriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssControlAcceptCriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssControlAcceptCriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
