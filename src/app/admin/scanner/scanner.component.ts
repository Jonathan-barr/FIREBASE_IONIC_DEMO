import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Producto } from 'src/app/models/producto.model';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {
  code: any;
  id = '93y0McOwmavhwbppmkLw';
  path='productos';
  productos: Producto[];
  prod: Producto[] = [];

  constructor(private menuCtrl: MenuController,
              private database: FirestoreService,
              private barcodeScanner: BarcodeScanner ) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  menu(){
    this.menuCtrl.open('principal');
  }

  scanear(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data: ', barcodeData.text);
      this.obtenerProductos();
    }).catch(err =>{
      console.log('Error',err);
    });
    
  }


 obtenerProductos(){
    // const arr : any[] = [];
    this.database.getCollections<Producto>(this.path).subscribe(res =>{
      this.productos= res;
      for (let i = 0 ; i < res.length; i++){
        if (res[i].id === this.code){
        console.log('encontre el id', res[i].id);
        this.prod.push(res[i]);
        console.log('este es el producto: ', this.prod);
      }
    }
    });
  }


}
