import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentPage } from './deployment.page';

describe('DeploymentPage', () => {
  let component: DeploymentPage;
  let fixture: ComponentFixture<DeploymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
