/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConducePdfComponent } from './conduce-pdf.component';

describe('ConducePdfComponent', () => {
  let component: ConducePdfComponent;
  let fixture: ComponentFixture<ConducePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConducePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConducePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
