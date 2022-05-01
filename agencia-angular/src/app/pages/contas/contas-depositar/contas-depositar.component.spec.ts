import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasDepositarComponent } from './contas-depositar.component';

describe('ContasDepositarComponent', () => {
  let component: ContasDepositarComponent;
  let fixture: ComponentFixture<ContasDepositarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContasDepositarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasDepositarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
