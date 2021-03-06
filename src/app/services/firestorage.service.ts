import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  cargarImagen(file: any, path: string, nombre: string): Promise<string>{ // hago una promesa de tipo String
    return new Promise (resolve => {
      const filePath = path +'/' +nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put (file);
      //resolve('Imagen Subida');
          task.snapshotChanges().pipe(
            finalize( ()=> {
              ref.getDownloadURL().subscribe( res=> {
                const downloadUrl = res;
                resolve(downloadUrl);
                return;
              });
            })
          ).subscribe();
    });
  }


} // NO TOCAR
