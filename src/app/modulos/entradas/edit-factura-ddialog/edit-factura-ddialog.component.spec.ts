import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacturaDdialogComponent } from './edit-factura-ddialog.component';

describe('EditFacturaDdialogComponent', () => {
  let component: EditFacturaDdialogComponent;
  let fixture: ComponentFixture<EditFacturaDdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFacturaDdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacturaDdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
