import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NotfoundComponent } from './notfound/notfound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [

  //path: '/dashboard' PagesRouting
  //path: 'auth' AuthRouting
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PagesRoutingModule,
            AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
