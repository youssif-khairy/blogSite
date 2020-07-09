import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterailModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { PostsModule } from './posts/posts.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './interceptors/auth-interceptors';
import { ErrorInterceptor } from './interceptors/error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    PostsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    AuthModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
