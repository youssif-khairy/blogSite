import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {path:'posts',component:PostsComponent,canActivate:[AuthGuard],children:[
        {
            path: '', component: AddEditPostComponent
        },
        {
            path: ':id/edit', component: AddEditPostComponent
        },
    ]},
    
    
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[AuthGuard]
})

export class PostsRoutingModule { }