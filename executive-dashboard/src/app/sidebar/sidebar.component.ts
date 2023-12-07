import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toggle = new EventEmitter<void>();

  onItemClick() {
    // Emit event to close sidebar when a menu item is clicked
    this.toggle.emit();
  }

}