import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  newDoc<tipo>(datos: string, path: string, id: string){
    // const collection = this.database.collection(path);
    // return collection.doc(id).set(datos);
    return this.database.collection(path).doc(id).set(datos);
  };

}
