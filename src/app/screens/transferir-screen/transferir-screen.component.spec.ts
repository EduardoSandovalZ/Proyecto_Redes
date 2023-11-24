import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferirScreenComponent } from './transferir-screen.component';

describe('TransferirScreenComponent', () => {
  let component: TransferirScreenComponent;
  let fixture: ComponentFixture<TransferirScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferirScreenComponent]
    });
    fixture = TestBed.createComponent(TransferirScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
