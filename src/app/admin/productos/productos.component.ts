import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  enableNuevo = false;
  newproducto: Producto;
  path='productos';
  productos: Producto[];

  constructor(private menuCtrl: MenuController ,
              private database: FirestoreService,
              public toastController: ToastController,
              public alertController: AlertController ) { }

  ngOnInit() {

    this.obtenerProductos();
  }

  menu(){

    this.menuCtrl.open('principal');
  }

  nuevoProducto(){
    this.enableNuevo=true;
    console.log('Nuevo');
    this.newproducto={
      id: this.database.getId(),
      nombre:'',
      descripcion:'',
      stock: null,
      precio: null,
      fecha: new Date()
    };

  }

  guardarProducto(){
    if(this.newproducto.nombre !== ''){
    console.log(this.newproducto);
    this.database.newDoc(this.newproducto,this.path,this.newproducto.id).then(res =>{
      this.nuevoProducto();
      this.print('Producto Guardado con Exito');
    }).catch(error => {
      // persistencia -> guardar localmente en sqlite
      this.print('No fue Posible Guardar el Producto');
    });

    }
    else {
      this.print('Error, existen campos vacios');
    }
  }

  obtenerProductos(){
    this.database.getCollections<Producto>(this.path).subscribe(res =>{
      this.productos = res;
      console.log(res);
    });
  }

  eliminarProducto(registro: Producto){

    console.log(registro);
    this.database.deleteDoc(this.path, registro.id);
  }

  async print(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'text_msg',
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm(registro: Producto){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      subHeader: 'Subtitle',
      message: 'Desea eliminar el producto: '+ registro.nombre+'?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass:'secondary',
          id: 'cancel-button',
          handler:(blah) =>{
            this.print('No se elimino el producto');
          }
        },
        {
          text: 'Si',
          role: 'confirm-',
          cssClass:'secondary',
          id: 'cancel-button',
          handler:() =>{
            this.eliminarProducto(registro);
        }
        }
      ]
    });

    await alert.present();

}
}
