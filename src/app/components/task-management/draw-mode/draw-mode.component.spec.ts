import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawModeComponent } from './draw-mode.component';

describe('DrawModeComponent', () => {
  let component: DrawModeComponent;
  let fixture: ComponentFixture<DrawModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
