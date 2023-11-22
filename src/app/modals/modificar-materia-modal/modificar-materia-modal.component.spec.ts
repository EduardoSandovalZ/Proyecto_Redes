import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMateriaModalComponent } from './modificar-materia-modal.component';

describe('ModificarMateriaModalComponent', () => {
  let component: ModificarMateriaModalComponent;
  let fixture: ComponentFixture<ModificarMateriaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarMateriaModalComponent]
    });
    fixture = TestBed.createComponent(ModificarMateriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
