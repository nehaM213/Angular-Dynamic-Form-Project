import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticularTemplateComponent } from './view-particular-template.component';

describe('ViewParticularTemplateComponent', () => {
  let component: ViewParticularTemplateComponent;
  let fixture: ComponentFixture<ViewParticularTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewParticularTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticularTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
