import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedyBankComponent } from './remedy-bank.component';

describe('RemedyBankComponent', () => {
  let component: RemedyBankComponent;
  let fixture: ComponentFixture<RemedyBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemedyBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemedyBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
