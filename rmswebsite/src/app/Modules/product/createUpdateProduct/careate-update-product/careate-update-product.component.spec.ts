import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareateUpdateProductComponent } from './careate-update-product.component';

describe('CareateUpdateProductComponent', () => {
  let component: CareateUpdateProductComponent;
  let fixture: ComponentFixture<CareateUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareateUpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareateUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
