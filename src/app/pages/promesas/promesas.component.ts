import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    })
    // const promesa = new Promise((resolve)=>{
    //   resolve('hello mundo');
    // });
    // promesa.then(()=>{
    //   console.log('termine');
    // }).catch(error => console.log('error en la promesa', error));
    // console.log('fin oninit');


  }

  getUsuarios(){

    const promesa = new Promise (resolve =>{
      fetch('https://reqres.in/api/users')
      .then(resp=> resp.json())
      .then(body => console.log(body.data));
    });
    return promesa;
  }
}
