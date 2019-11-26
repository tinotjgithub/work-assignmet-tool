import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditModeComponent } from './audit-mode.component';

describe('AuditModeComponent', () => {
  let component: AuditModeComponent;
  let fixture: ComponentFixture<AuditModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
