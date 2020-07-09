import { NgModule } from "@angular/core";
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterailModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    declarations:
    [   LoginComponent,
        SignupComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MaterailModule,
        FlexLayoutModule,
    ],
    exports:[]
})

export class AuthModule{}