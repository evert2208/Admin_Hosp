import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SettingComponent } from './setting/setting.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
    {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Graficas'}},
    {path: 'settings', component: SettingComponent, data: {titulo: 'Ajustes'}},
    {path: 'buscar/:termino', component: BusquedaComponent, data: {titulo: 'busquedas'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
    {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},

    //Mantenimiento
    {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'hospitales'}},
    {path: 'medicos', component: MedicosComponent, data: {titulo: 'medicos'}},
    {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'medico'}},

    //Rutas Admin
    {path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuario de aplicacion'}},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
