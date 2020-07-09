import { NgModule } from '@angular/core';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { MaterailModule } from '../material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        AllPostsComponent,
        PostsComponent,
        AddEditPostComponent,
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PostsRoutingModule,
        MaterailModule,
        FlexLayoutModule,
    ],
    exports:[
        ReactiveFormsModule,
        FormsModule,
        MaterailModule,
        FlexLayoutModule,
    ],

})

export class PostsModule{}