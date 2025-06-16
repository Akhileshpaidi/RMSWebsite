import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupadminViewstatutoryformsComponent } from './supadmin-viewstatutoryforms.component';

describe('SupadminViewstatutoryformsComponent', () => {
  let component: SupadminViewstatutoryformsComponent;
  let fixture: ComponentFixture<SupadminViewstatutoryformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupadminViewstatutoryformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupadminViewstatutoryformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
