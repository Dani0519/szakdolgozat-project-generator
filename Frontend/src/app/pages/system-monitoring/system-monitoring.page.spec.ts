import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMonitoringPage } from './system-monitoring.page';

describe('SystemMonitoringPage', () => {
  let component: SystemMonitoringPage;
  let fixture: ComponentFixture<SystemMonitoringPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMonitoringPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMonitoringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
