import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprioritizeComponent } from './reprioritize.component';

describe('ReprioritizeComponent', () => {
  let component: ReprioritizeComponent;
  let fixture: ComponentFixture<ReprioritizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprioritizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprioritizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
