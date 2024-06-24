import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSquareIconComponent } from './check-square-icon.component';

describe('CheckSquareIconComponent', () => {
  let component: CheckSquareIconComponent;
  let fixture: ComponentFixture<CheckSquareIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckSquareIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckSquareIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
