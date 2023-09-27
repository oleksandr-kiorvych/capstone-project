import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/ui/header/header.component';
import { authReducer } from './shared/data-access/auth-store/auth.reducer';
import { AuthEffect } from './shared/data-access/auth-store/auth.effects';
import {
  GetUserByIdService,
  initializeAppFactory,
} from './core/factories/appInitialize.factory';
import { PersistanceService } from './shared/data-access/persistance.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ userSlice: authReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffect]),
    HeaderComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAppFactory,
      deps: [GetUserByIdService, PersistanceService, Router, Store],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
