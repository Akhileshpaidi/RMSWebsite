import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupAdminEditStatutoryfromsComponent } from './sup-admin-edit-statutoryfroms.component';

describe('SupAdminEditStatutoryfromsComponent', () => {
  let component: SupAdminEditStatutoryfromsComponent;
  let fixture: ComponentFixture<SupAdminEditStatutoryfromsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupAdminEditStatutoryfromsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupAdminEditStatutoryfromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
