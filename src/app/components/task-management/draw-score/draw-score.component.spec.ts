import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawScoreComponent } from './draw-score.component';

describe('DrawScoreComponent', () => {
  let component: DrawScoreComponent;
  let fixture: ComponentFixture<DrawScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
