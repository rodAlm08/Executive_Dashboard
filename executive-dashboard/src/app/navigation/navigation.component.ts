import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


	
}
