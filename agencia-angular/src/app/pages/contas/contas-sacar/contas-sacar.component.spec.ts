import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasSacarComponent } from './contas-sacar.component';

describe('ContasSacarComponent', () => {
  let component: ContasSacarComponent;
  let fixture: ComponentFixture<ContasSacarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContasSacarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasSacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
