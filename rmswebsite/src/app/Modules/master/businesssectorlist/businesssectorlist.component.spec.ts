import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesssectorlistComponent } from './businesssectorlist.component';

describe('BusinesssectorlistComponent', () => {
  let component: BusinesssectorlistComponent;
  let fixture: ComponentFixture<BusinesssectorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesssectorlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesssectorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
