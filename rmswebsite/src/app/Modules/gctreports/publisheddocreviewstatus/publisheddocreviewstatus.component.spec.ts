import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisheddocreviewstatusComponent } from './publisheddocreviewstatus.component';

describe('PublisheddocreviewstatusComponent', () => {
  let component: PublisheddocreviewstatusComponent;
  let fixture: ComponentFixture<PublisheddocreviewstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisheddocreviewstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisheddocreviewstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
