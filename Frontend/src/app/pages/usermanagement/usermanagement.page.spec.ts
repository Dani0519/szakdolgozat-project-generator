import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementPage } from './usermanagement.page';

describe('UsermanagementPage', () => {
  let component: UsermanagementPage;
  let fixture: ComponentFixture<UsermanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
