import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { E2eComponent } from './e2e.component';

describe('E2eComponent', () => {
  let component: E2eComponent;
  let fixture: ComponentFixture<E2eComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ E2eComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(E2eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
