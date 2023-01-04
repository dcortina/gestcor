import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActPlanComponent } from './dialog-act-plan.component';

describe('DialogActPlanComponent', () => {
  let component: DialogActPlanComponent;
  let fixture: ComponentFixture<DialogActPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
