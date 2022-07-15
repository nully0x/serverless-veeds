import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';


@NgModule({
  imports: [AngularFireModule.initializeApp(environment.firebaseConfig), ],
  exports: [AngularFireModule, AngularFireAuthModule, AngularFireDatabaseModule,],
})
export class AppFirebaseModule {}
