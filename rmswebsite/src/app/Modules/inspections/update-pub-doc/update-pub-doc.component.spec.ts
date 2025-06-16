import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePubDocComponent } from './update-pub-doc.component';

describe('UpdatePubDocComponent', () => {
  let component: UpdatePubDocComponent;
  let fixture: ComponentFixture<UpdatePubDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePubDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePubDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
