import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobarPreciosComponent } from './comprobar-precios.component';

describe('ComprobarPreciosComponent', () => {
  let component: ComprobarPreciosComponent;
  let fixture: ComponentFixture<ComprobarPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobarPreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobarPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
