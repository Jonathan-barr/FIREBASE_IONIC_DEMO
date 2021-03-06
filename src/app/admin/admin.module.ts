import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { ScannerComponent } from './scanner/scanner.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductosComponent,
    ScannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule
  ]
})
export class AdminModule { }
