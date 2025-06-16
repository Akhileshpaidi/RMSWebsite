import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrTestParaReleCatgComponent } from './contr-test-para-rele-catg.component';

describe('ContrTestParaReleCatgComponent', () => {
  let component: ContrTestParaReleCatgComponent;
  let fixture: ComponentFixture<ContrTestParaReleCatgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrTestParaReleCatgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrTestParaReleCatgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
