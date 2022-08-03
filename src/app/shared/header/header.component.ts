import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario | undefined;
  mail: number;
  constructor(private usuarioService: UsuarioService,
              private router: Router) {
    this.usuario= usuarioService.usuario;
    //console.log(this.usuario);
    this.mail= usuarioService.usuario.email.length;
  }

  logout(){
    this.usuarioService.logout();
  }

  buscar(termino: string){

    if(termino.length===0) {
      //this.router.navigateByUrl('/dashboard');
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
