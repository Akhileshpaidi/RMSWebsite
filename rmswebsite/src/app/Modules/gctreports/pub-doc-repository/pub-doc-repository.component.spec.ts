import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubDocRepositoryComponent } from './pub-doc-repository.component';

describe('PubDocRepositoryComponent', () => {
  let component: PubDocRepositoryComponent;
  let fixture: ComponentFixture<PubDocRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubDocRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubDocRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
