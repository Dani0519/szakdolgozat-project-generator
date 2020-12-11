import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDeploymentPage } from './mobile-deployment.page';

describe('MobileDeploymentPage', () => {
  let component: MobileDeploymentPage;
  let fixture: ComponentFixture<MobileDeploymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileDeploymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileDeploymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
