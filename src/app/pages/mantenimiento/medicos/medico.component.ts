import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { Subscription } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medicos.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup | any;
  public hospitales: Hospital[]=[];
  public hospitalesSeleccionado: Hospital | any;
  public medicoSeleccionado: Medico | any;


  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.cargarMedico(id);

    })



    this.medicoForm=this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges
    .subscribe((hospitalId: any) => {
      this.hospitalesSeleccionado=this.hospitales.find(hosp => hosp._id===hospitalId)

    })
  }

  cargarMedico(id: string){
    if(id==='nuevo'){
      return;
    }
    this.medicoService.obtenerMedicoPorId(id).subscribe({
      next: (medico: any) => {
        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({
          nombre: medico.nombre,
          hospital: medico.hospital._id,
        });
      },
      // error: () => {
      //   this.router.navigateByUrl('/dashboard/medicos');
      // },
    });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe(
      (hospitales: Hospital[])=>{
        this.hospitales= hospitales;
      }
    );
  }


  guardarMedico(){

    const {nombre}= this.medicoForm.value;
    if(this.medicoSeleccionado){
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
      .subscribe(resp => {
        Swal.fire('Actualizado',`${nombre} fue Actualizado`, 'success' );
        //this.router.navigateByUrl(`/dashboard/medicos/${resp.medico_id}`)
      })
    }else {

    this.medicoService.crearMedico(this.medicoForm.value)
      .subscribe((resp: any) => {
        Swal.fire('Creado',`${nombre} creado`, 'success' );
        this.router.navigateByUrl(`/dashboard/medicos/${resp.medico_id}`)
      })
    }

  }

}
