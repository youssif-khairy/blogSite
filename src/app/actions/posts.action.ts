import { Action } from "@ngrx/store";
import { PostModel } from "../models/post.model";


export const SET_ALL_POSTS = '[Posts] Get All Posts';
export const ADD_POST = '[Posts] Add Post'
export const EDIT_POST = '[Posts] Edit Post'
export const DELETE_POST = '[Posts] Delete Post'


export class SetAllPosts implements Action{
    readonly type: string = SET_ALL_POSTS;
    constructor(public payload:PostModel[]){}
}
export class AddNewPost implements Action{
    readonly type: string = ADD_POST
    
    constructor(public payload:any){}
}
export class EditPost implements Action{
    readonly type: string = EDIT_POST
    
    constructor(public payload:any){}
}
export class DeletePost implements Action{
    readonly type: string = DELETE_POST
    
    constructor(public payload:any){}
}

export type PostsActions = SetAllPosts | AddNewPost | EditPost | DeletePost;