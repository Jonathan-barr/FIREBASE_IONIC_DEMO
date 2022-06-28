import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
})
export class AdminModule { }
