import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditScoreComponent } from './audit-score.component';

describe('AuditScoreComponent', () => {
  let component: AuditScoreComponent;
  let fixture: ComponentFixture<AuditScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
