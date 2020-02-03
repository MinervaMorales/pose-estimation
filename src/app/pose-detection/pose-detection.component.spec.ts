import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoseDetectionComponent } from './pose-detection.component';

describe('PoseDetectionComponent', () => {
  let component: PoseDetectionComponent;
  let fixture: ComponentFixture<PoseDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoseDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoseDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
