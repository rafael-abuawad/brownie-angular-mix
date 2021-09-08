import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidityComponent } from './solidity.component';

describe('SolidityComponent', () => {
  let component: SolidityComponent;
  let fixture: ComponentFixture<SolidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolidityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
