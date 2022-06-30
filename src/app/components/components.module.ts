import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import {FormsModule} from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalImgComponent } from './modal-img/modal-img.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent
  ]
})
export class ComponentsModule { }
