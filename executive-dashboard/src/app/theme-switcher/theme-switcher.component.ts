// theme-switcher.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <mat-form-field>
      <mat-label>Choose Theme</mat-label>
      <mat-select [(value)]="selectedTheme" (selectionChange)="onThemeChange()">
        <mat-option *ngFor="let theme of themes" [value]="theme">{{ theme }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    mat-form-field {
      margin-right: 20px;
    }
  `]
})
export class ThemeSwitcherComponent {
  themes: string[] = ['default', 'dark'];

  selectedTheme: string = 'default';

  constructor(private themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe(theme => this.selectedTheme = theme);
  }

  onThemeChange(): void {
    this.themeService.setTheme(this.selectedTheme);
  }
}
