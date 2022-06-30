import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public imgSubs: Subscription | any;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[]=[];
  public usuariosTemp: Usuario[]=[];
  public desde: number = 0;
  public cargando: boolean= true;
  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImgService: ModalImgService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs=this.modalImgService.nuevaImg.pipe(delay(100))
      .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(resp => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
      this.cargando=false;
    })
  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if (this.desde <0) {
      this.desde = 0;

    }else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string){

    if (termino.length===0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino)
        .subscribe(resp => {
          this.usuarios = resp;
        });
        return;
  }

  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid=== this.usuarioService.uid) {
        return Swal.fire('Error', 'no se puede borrar', 'error' );
    }

    Swal.fire({
      title: '¿borrar usuario?',
      text: `esta seguro de borrar a ${usuario.nombre}?`,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
              this.cargarUsuarios();
              Swal.fire('Usuario borrado', `${usuario.nombre} se elimino correctamente`, 'success')
            });

      }
    })
    return;
  }

  cambiarRole(user: Usuario){
    this.usuarioService.guardarUsuario(user).subscribe(resp => {

    })
  }

  abrirModal(user: Usuario){
    this.modalImgService.abrirModal('usuarios',user.uid ,user.img);
  }
}
