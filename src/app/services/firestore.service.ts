import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  newDoc(datos: any, path: string, id: string){
    return this.database.collection(path).doc(id).set(datos);
  };

  getId(){
    return this.database.createId();
  }

  getCollections<Tipo>(path: string){
      return this.database.collection<Tipo>(path).valueChanges();
      // el value changes es un observable algo que está pendiente a ver si se cambia algo o no//

    }



  deleteDoc(path: string, id: string){
    return this.database.collection(path).doc(id).delete();
  }

  getDoc(path: string, id: string){
    return this.database.collection(path).doc(id);
  }

}


  // const collection = this.database.collection(path);
    // return collection.doc(id).set(datos);
