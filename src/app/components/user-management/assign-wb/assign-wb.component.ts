import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-wb',
  templateUrl: './assign-wb.component.html',
  styleUrls: ['./assign-wb.component.css']
})
export class AssignWbComponent implements OnInit {
  @Output() previousRoleTab: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  previousPage() {
    this.previousRoleTab.emit('ASSIGN_ROLE');
  }
}
