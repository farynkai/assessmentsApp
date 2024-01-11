import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatDialogModule } from "@angular/material/dialog";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthModule } from './modules/auth/auth.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { environment } from '../environments/environment';
import { reducers } from './store/reducers';
import { ToastService } from './shared/services/toast.service';
import { AuthService } from './modules/auth/auth.service';
import { HomeModule } from './modules/home/home.module';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { DeleteNotificationComponent } from './shared/components/delete-notification/delete-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeleteNotificationComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers),
    MatSnackBarModule,
    MatToolbarModule,
    AppRoutingModule,
    MatDialogModule,
    AuthModule,
    HomeModule,
    StoreDevtoolsModule.instrument({ name: 'NgRx Test App', logOnly: environment.production }),
  ],
  providers: [
    ToastService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
