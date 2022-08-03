import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImgService } from '../../../services/modal-img.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: any | Hospital[]= [];
  public cargando: boolean= true;
  public imgSubs: Subscription | any;
  constructor(private hospitalService: HospitalService,
              private modalImgService: ModalImgService,
              private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs=this.modalImgService.nuevaImg.pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando= true;
    this.hospitalService.cargarHospitales().subscribe(hospitales => {
      this.cargando= false;
      this.hospitales=hospitales;
    })
  }

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe(resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success')
    })
  }

  borrarHospital(hospital: Hospital){
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Borrado', hospital.nombre, 'success')
    });
  }

  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<any>({
      input: 'text',
      title: 'Crear Hospital',
      inputLabel: 'Nombre Hospital',
      inputPlaceholder: 'Nombre',
      showCancelButton: true
    })

    if(value.trim().length>0){
      this.hospitalService.crearHospital(value)
      .subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
        Swal.fire('Creado',value,'success');
      })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImgService.abrirModal('hospitales',hospital._id ,hospital.img);
  }

  buscar(termino: string){

    if (termino.length===0) {
      this.cargarHospitales();
    }
    this.busquedaService.buscar('hospitales', termino)
        .subscribe(resp => {
          this.hospitales = resp;
        });
        return;
  }
}
