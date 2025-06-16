import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckRequestedDocListComponent } from './ack-requested-doc-list.component';

describe('AckRequestedDocListComponent', () => {
  let component: AckRequestedDocListComponent;
  let fixture: ComponentFixture<AckRequestedDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AckRequestedDocListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AckRequestedDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
