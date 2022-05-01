import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasTransferirComponent } from './contas-transferir.component';

describe('ContasTransferirComponent', () => {
  let component: ContasTransferirComponent;
  let fixture: ComponentFixture<ContasTransferirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContasTransferirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasTransferirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
