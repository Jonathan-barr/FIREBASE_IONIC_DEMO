import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  enableNuevo = false;
  newproducto: Producto;
  path='productos';

  constructor(private menuCtrl: MenuController , private database: FirestoreService) { }

  ngOnInit() {}

  menu(){

    this.menuCtrl.open('principal');
  }

  nuevoProducto(){
    this.enableNuevo=true;
    console.log('Nuevo');
    this.newproducto={
      id: null,
      nombre:'',
      descripcion:'',
      stock: null,
      precio: null,
      fecha: new Date()
    };

  }

  guardarProducto(){
    const id ='10001';
    console.log(this.newproducto);
    this.database.newDoc(this.newproducto,this.path,id);

  }

}

