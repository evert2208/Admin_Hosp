import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medicos.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[]=[];
  cargando: boolean=true;
  private imgSubs: Subscription | any;
  constructor(private medicoService: MedicoService,
              private modalImgService: ModalImgService,
              private busquedaService: BusquedasService) { }

   ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs=this.modalImgService.nuevaImg.pipe(delay(100))
    .subscribe(img => this.cargarMedicos());
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.cargarMedicos().subscribe(medicos =>{
      this.cargando=false;
      this.medicos= medicos;

    })
  }

  abrirModal(medico: Medico){
    this.modalImgService.abrirModal('medicos',medico._id ,medico.img);
  }

  buscar(termino: string){
    if (termino.length===0) {
      this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos', termino)
        .subscribe(resp => {
          this.medicos = resp;
        });
        return;
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿borrar medico?',
      text: `esta seguro de borrar a ${medico.nombre}?`,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
            .subscribe(resp => {
              this.cargarMedicos();
              Swal.fire('Medico borrado', `${medico.nombre} se elimino correctamente`, 'success')
            });

      }
    })
  }

}
