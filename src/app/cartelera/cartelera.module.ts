import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { CarteleraComponent } from './cartelera.component';


@NgModule({
  declarations: [CarteleraComponent],
  imports: [
    CommonModule,
    CarteleraRoutingModule
  ]
})
export class CarteleraModule { }
