import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario | undefined;
  mail: number;
  constructor(private usuarioService: UsuarioService) {
    this.usuario= usuarioService.usuario;
    //console.log(this.usuario);
    this.mail= usuarioService.usuario.email.length;
  }

  logout(){
    this.usuarioService.logout();
  }

}
