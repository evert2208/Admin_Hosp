import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from 'src/app/models/medicos.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[]=[];
  public medicos: Medico[]=[];
  public hospitales: Hospital[]=[];

  constructor( private activateRoute: ActivatedRoute,
               private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({termino}) =>
      this.busquedaGlobal(termino)
    )
  }

  busquedaGlobal(termino: string){
    this.busquedaService.busquedaGlobal(termino)
    .subscribe((resp:any) => {
      //console.log(resp);
      this.usuarios=resp.usuarios;
      this.medicos= resp.medicos;
      this.hospitales= resp.hospitales;
    })
  }


}
