import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offcanvas-content',
  templateUrl: './offcanvas-content.component.html',
  styleUrls: ['./offcanvas-content.component.css']
})
export class OffcanvasContentComponent {
  constructor(public offcanvas: NgbOffcanvas)
}
