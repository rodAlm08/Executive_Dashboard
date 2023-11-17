// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('default');
  currentTheme$ = this.themeSubject.asObservable();

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
  }
}
