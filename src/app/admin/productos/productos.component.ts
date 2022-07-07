import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FirestorageService } from '../../services/firestorage.service';

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
  newImage = '';
  newFile: any;

  constructor(private menuCtrl: MenuController ,
              private database: FirestoreService,
              public toastController: ToastController,
              public alertController: AlertController,
              public fileStore: FirestorageService ) { }

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
      fecha: new Date(),
      imagen: ''
    };

  }

  async guardarProducto(){
    if(this.newproducto.nombre !== ''){
      // obtiene el url del registro de la imagen
      //const archivo = file.target.files[0];
      const path = 'Productos';
      const url = await this.fileStore.cargarImagen(this.newFile,path,this.newproducto.nombre);
      this.newproducto.imagen=url;

      //console.log(this.newproducto);

    // guarda la información del producto en el store
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
// Cargar imagen
async uploadImage(file: any){ // aqui agregue el async

   if(file.target.files && file.target.files[0]){
    this.newFile = file.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image)=>{
        this.newproducto.imagen =image.target.result as string;
      });
      reader.readAsDataURL(file.target.files[0]);
  }


    //console.log(res);
    // this.fileStore.cargarImagen(archivo,path,name).then( res =>{
    //   console.log(res);
    // }).catch(error => {
    //   this.print('No se pudo cargar la Imagen');
    // });
}
}
