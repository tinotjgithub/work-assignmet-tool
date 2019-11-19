import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})
export class AssignRolesComponent implements OnInit {
  @Output() nextRoleTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousBasicTab: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  previousPage() {
    this.previousBasicTab.emit('INFO');
  }
  onSubmit() {
    this.nextRoleTab.emit('WB');
  }

}
