import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales' | any;
  public id: string | any;
  public img: string | any;

  public nuevaImg : EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string='no-img'){
    this._ocultarModal = false;
    this.tipo= tipo;
    this.id= id;
    if (img.includes('https')) {
     this.img=img;
    }else {
      this.img= `${base_url}/upload/${tipo}/${img}`
    }
    //this.img= img;
    // http://localhost:3000/api/upload/medicos/7d6f0b83-5632-4a5e-abe1-783ddf92cfac
  }

  cerrarModal(){
    this._ocultarModal = true;
  }
  constructor() { }
}
