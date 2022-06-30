import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { ModalImgService } from '../../services/modal-img.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {

  //usuario : Usuario | any;
  imagenSubir: File | any;
  imgTemp: any = null;

  constructor(public modalImg: ModalImgService,
              public uploadService: UploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp= null;
    this.modalImg.cerrarModal();
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
    const id = this.modalImg.id;
    const tipo = this.modalImg.tipo;
    this.uploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then(img => {

      Swal.fire('Actualizado','imagen actualizada', 'success');
      this.modalImg.nuevaImg.emit(img);
      this.cerrarModal();
    }).catch(err =>{
      Swal.fire('Error','no se pudo subir la imagen', 'error');
    })
  }
}
