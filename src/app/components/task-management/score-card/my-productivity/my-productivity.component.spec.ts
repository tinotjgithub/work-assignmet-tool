import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductivityComponent } from './my-productivity.component';

describe('MyProductivityComponent', () => {
  let component: MyProductivityComponent;
  let fixture: ComponentFixture<MyProductivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
