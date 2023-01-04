import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConduceComponent } from './conduce.component';

describe('ConduceComponent', () => {
  let component: ConduceComponent;
  let fixture: ComponentFixture<ConduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConduceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
