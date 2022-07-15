import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  veedsDetailList: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore ) {}

  getveedsDetailList() {
    this.veedsDetailList = this.afs.collection('veeds');
  }

}
