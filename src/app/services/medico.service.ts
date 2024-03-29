import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medicos.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos(): Observable<Medico[]>{
    const url = `${base_url}/medicos`;
    return this.http.get<{ok: boolean, medicos: Medico[]}>(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
    )


  }

  obtenerMedicoPorId(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<{ok: boolean, medico: Medico[]}>(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, medico: Medico[]}) => resp.medico)
    )
  }

  crearMedico(medico: {nombre: string, hospital: string} ){
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);

  }

  actualizarMedico(medico: Medico ){
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);

  }
  borrarMedico(_id: string|any ){
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);

  }

}
