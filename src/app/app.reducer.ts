import * as fromPosts from './reducers/posts.reducer'
import * as fromAuth from './reducers/auth.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
    posts: fromPosts.State,
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
    posts: fromPosts.postReducer,
    auth : fromAuth.authReducer
}

export const getPostsState = createFeatureSelector<fromPosts.State>('posts')
export const getAllPosts = createSelector(getPostsState,fromPosts.getAllPosts)
export const getPostByID = (id:number) => createSelector(getPostsState,fromPosts.getPostByID(id))
///////////////////////////////
export const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const isAuthenticated = createSelector(getAuthState,fromAuth.is_auth)
