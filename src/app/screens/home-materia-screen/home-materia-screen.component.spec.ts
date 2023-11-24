import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMateriaScreenComponent } from './home-materia-screen.component';

describe('HomeMateriaScreenComponent', () => {
  let component: HomeMateriaScreenComponent;
  let fixture: ComponentFixture<HomeMateriaScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMateriaScreenComponent]
    });
    fixture = TestBed.createComponent(HomeMateriaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
