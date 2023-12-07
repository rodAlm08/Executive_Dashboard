// sidebar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule,MatSidenavModule, MatIconModule, MatListModule],
  exports: [SidebarComponent],
})
export class SidebarModule {
  
}

