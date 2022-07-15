import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppFirebaseModule } from './modules/app-firebase.module';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { CreateComponent } from './components/create/create.component';
import { FeedComponent } from './components/feed/feed.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    FeedComponent,
    HeaderComponent,
    ProfileCardComponent,
  ],
  imports: [
    AppFirebaseModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
