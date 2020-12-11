import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewPage } from './project-view.page';

describe('ProjectViewPage', () => {
  let component: ProjectViewPage;
  let fixture: ComponentFixture<ProjectViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
