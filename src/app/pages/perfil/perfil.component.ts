import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup | any;
  usuario : Usuario | any;
  imagenSubir: File | any;
  imgTemp: any = null;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private uploadService: UploadService) {
                this.usuario= usuarioService.usuario;
              }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe((resp:any) => {
      const {nombre, email}= this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email= email;
      //console.log(resp);
      Swal.fire('Actualizado',resp.msg, 'success');
    },(err)=>{
      Swal.fire('Error',err.error.msg, 'error');
    });

  }

  cambiarImagen(event: any){
    this.imagenSubir = event.target.files[0];


    if(!this.imagenSubir){
      return this.imgTemp;
    }

    const reader = new FileReader();
     reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.uploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => {
      this.usuario.img = img;
      Swal.fire('Actualizado','imagen actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error','no se pudo subir la imagen', 'error');
    })
  }
}
