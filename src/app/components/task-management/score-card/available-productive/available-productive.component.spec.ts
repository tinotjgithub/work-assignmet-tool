import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableProductiveComponent } from './available-productive.component';

describe('AvailableProductiveComponent', () => {
  let component: AvailableProductiveComponent;
  let fixture: ComponentFixture<AvailableProductiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableProductiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableProductiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
