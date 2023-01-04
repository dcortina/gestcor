import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProvedoresComponent } from './dialog-provedores.component';

describe('DialogProvedoresComponent', () => {
  let component: DialogProvedoresComponent;
  let fixture: ComponentFixture<DialogProvedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProvedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProvedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
