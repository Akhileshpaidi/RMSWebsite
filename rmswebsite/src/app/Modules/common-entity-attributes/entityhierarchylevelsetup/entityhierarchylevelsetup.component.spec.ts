import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityhierarchylevelsetupComponent } from './entityhierarchylevelsetup.component';

describe('EntityhierarchylevelsetupComponent', () => {
  let component: EntityhierarchylevelsetupComponent;
  let fixture: ComponentFixture<EntityhierarchylevelsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityhierarchylevelsetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityhierarchylevelsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
