import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectPoseComponent } from './detect-pose.component';

describe('DetectPoseComponent', () => {
  let component: DetectPoseComponent;
  let fixture: ComponentFixture<DetectPoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectPoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectPoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
