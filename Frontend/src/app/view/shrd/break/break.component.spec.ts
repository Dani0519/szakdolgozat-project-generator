import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakComponent } from './break.component';

describe('BreakComponent', () => {
  let component: BreakComponent;
  let fixture: ComponentFixture<BreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
