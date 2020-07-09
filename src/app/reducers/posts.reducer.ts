import { PostModel } from '../models/post.model';
import { PostsActions, SET_ALL_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from '../actions/posts.action';

export interface State {
    all_posts : PostModel[],
}

const initialState:State = {
    all_posts : [],
}

export function postReducer(state = initialState,action:PostsActions){

    switch(action.type){
        case(SET_ALL_POSTS) : {
            return {
                ...state,
                all_posts : action.payload
            }
        }
        case(ADD_POST) : {
            return {
                ...state,
                all_posts : [...state.all_posts,action.payload]
            }
        }
        case(EDIT_POST) : {
            let new_posts:PostModel[] = state.all_posts.filter((_,index)=> index != action.payload.id)
            new_posts.push(action.payload.model)
            return {
                ...state,
                all_posts : [...new_posts]
            }
        }
        case(DELETE_POST) : { 
            let new_posts:PostModel[] = state.all_posts.filter((_,index)=> index != action.payload.id)
            return {
                ...state,
                all_posts: [...new_posts ]
            }
        }
        
        default : {
            return state;
        }
    }
}

export const getAllPosts = (state:State) => state.all_posts
export const getPostByID  = (id:number) => (state:State) => state.all_posts[id]