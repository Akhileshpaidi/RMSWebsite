import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreRelatedInfoDialogboxComponent } from './more-related-info-dialogbox.component';

describe('MoreRelatedInfoDialogboxComponent', () => {
  let component: MoreRelatedInfoDialogboxComponent;
  let fixture: ComponentFixture<MoreRelatedInfoDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreRelatedInfoDialogboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreRelatedInfoDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
