import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  selectedSetting!:number;

  selectSetting(input:number){
    this.selectedSetting = input;
    localStorage.setItem('selectedSetting', String(this.selectedSetting));
  }

  ngOnInit(): void {
    this.selectedSetting = Number(localStorage.getItem('selectedSetting')) || 1; // Default to 1 if no value is found
  }
}
