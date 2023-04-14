import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { ReportsEffects } from './store/reports/reports.effects';
import { GraphComponent } from './components/graph/graph.component';
import { reducers } from './store/reducers';
import { UnsubscriberComponent } from './components/unsubscriber/unsubscriber.component';
import { ToastService } from './services/toast.service';
import { ReportsService } from './services/reports.service';
import { GraphsService } from './services/graphs.service';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminModule } from './admin/admin.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    GraphComponent,
    UnsubscriberComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, ReportsEffects]),
    StoreModule.forRoot(reducers),
    MatSnackBarModule,
    MatToolbarModule,
    AppRoutingModule,
    AuthModule,
    AdminModule,
    NgxChartsModule,
    StoreDevtoolsModule.instrument({ name: 'NgRx Assessments App', logOnly: environment.production }),
  ],
  providers: [
    ToastService,
    ReportsService,
    GraphsService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
