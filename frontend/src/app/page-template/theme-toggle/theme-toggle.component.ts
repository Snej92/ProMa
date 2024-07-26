import {Component, OnInit} from '@angular/core';
import {ThemeService} from "./service/theme.service";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements OnInit{
  isDarkMode : boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode()
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString())
    this.themeService.setDarkMode(this.isDarkMode);
  }

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    this.themeService.setDarkMode(this.isDarkMode);
  }

}
