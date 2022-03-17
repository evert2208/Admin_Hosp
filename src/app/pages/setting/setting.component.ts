import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styles: [
  ]
})
export class SettingComponent implements OnInit {

 constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.settingsService.changeTheme(theme);
  }

}
