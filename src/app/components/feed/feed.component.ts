import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage/storage.service'
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Veeds{
  downloadURL: string; 
  path: string;
}


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})

export class FeedComponent implements OnInit {
  veedsCollections: AngularFirestoreCollection<Veeds>;
  veeds: Observable<Veeds[]>;

  constructor(private service: AngularFirestore) { }

  ngOnInit() {
         this.veedsCollections = this.service.collection('veeds')
          this.veeds = this.veedsCollections.valueChanges()
          console.log(this.veeds)
  }

}