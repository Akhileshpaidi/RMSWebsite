import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewControlStatementComponent } from './view-control-statement.component';

describe('ViewControlStatementComponent', () => {
  let component: ViewControlStatementComponent;
  let fixture: ComponentFixture<ViewControlStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewControlStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewControlStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
