import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VyperComponent } from './vyper.component';

describe('VyperComponent', () => {
  let component: VyperComponent;
  let fixture: ComponentFixture<VyperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VyperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
