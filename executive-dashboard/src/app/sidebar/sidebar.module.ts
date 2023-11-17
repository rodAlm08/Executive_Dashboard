import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, SidebarModule],
  exports: [SidebarComponent], // Add this line
})
export class SidebarModule { }
