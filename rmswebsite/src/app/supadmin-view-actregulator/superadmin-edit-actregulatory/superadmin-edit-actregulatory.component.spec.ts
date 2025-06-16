import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminEditActregulatoryComponent } from './superadmin-edit-actregulatory.component';

describe('SuperadminEditActregulatoryComponent', () => {
  let component: SuperadminEditActregulatoryComponent;
  let fixture: ComponentFixture<SuperadminEditActregulatoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminEditActregulatoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminEditActregulatoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
