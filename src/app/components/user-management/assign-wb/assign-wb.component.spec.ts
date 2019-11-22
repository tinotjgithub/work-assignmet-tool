import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWbComponent } from './assign-wb.component';

describe('AssignWbComponent', () => {
  let component: AssignWbComponent;
  let fixture: ComponentFixture<AssignWbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignWbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
