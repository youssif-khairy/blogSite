import { Action } from '@ngrx/store'



export const IS_AUTHENTICATED = '[Auth] Is authenticated'
export const IS_NOT_AUTHENTICATED = '[Auth] Is Not authenticated'


export class Is_Authenticated implements Action{
    readonly type:string = IS_AUTHENTICATED
}

export class Is_Not_Authenticated implements Action{
    readonly type:string = IS_NOT_AUTHENTICATED
}

export type AuthActions = Is_Authenticated | Is_Not_Authenticated;