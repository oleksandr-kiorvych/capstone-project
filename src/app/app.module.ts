import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/ui/header/header.component';
import { AuthEffect } from './auth/data-access/store/auth.effects';
import {
  GetUserByIdService,
  initializeAppFactory,
} from './core/factories/appInitialize.factory';
import { PersistanceService } from './shared/utils/services/persistance.service';
import { todosReducer } from './todos/data-access/todo-store/todos.reducer';
import { TodosEffect } from './todos/data-access/todo-store/todos.effects';
import { authReducer } from './auth/data-access/store/auth.reducer';
import { HeadersInterceptor } from './core/interceptor/headers.interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ userSlice: authReducer, todosSlice: todosReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffect, TodosEffect]),
    HeaderComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAppFactory,
      deps: [GetUserByIdService, PersistanceService, Router, Store],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
