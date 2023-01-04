import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConduceComponent } from './dialog-conduce.component';

describe('DialogConduceComponent', () => {
  let component: DialogConduceComponent;
  let fixture: ComponentFixture<DialogConduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConduceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
