import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(): Observable<Hospital[]>{
    const url = `${base_url}/hospitales`;
    return this.http.get<{ok: boolean, hospitales: Hospital[]}>(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales)
    )


  }

  crearHospital(nombre: string ){
    const url = `${base_url}/hospitales`;
    return this.http.post(url, {nombre}, this.headers);

  }

  actualizarHospital(_id: string|any, nombre: string ){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre}, this.headers);

  }
  borrarHospital(_id: string|any ){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);

  }

}
