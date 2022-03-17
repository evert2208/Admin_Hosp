import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme= document.querySelector('#theme');
  constructor() {
    const url=localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    // const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);

   }


  changeTheme(theme: string){

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
   //  console.log(theme);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();

   }


  checkCurrentTheme(){


 //public linkTheme= document.querySelector('#theme');
 const links= document.querySelectorAll('.selector');


    links.forEach((elem: any) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }
    })
  }

}
