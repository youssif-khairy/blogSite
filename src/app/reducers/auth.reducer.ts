import { AuthActions, IS_AUTHENTICATED, IS_NOT_AUTHENTICATED } from '../actions/auth.action';
import { UserModel } from '../models/user.model';


export interface State {
    is_authenticated:boolean,
}

const initialState:State = {
    is_authenticated:false,
}

export function authReducer(state = initialState,action:AuthActions){

    switch(action.type){
        case(IS_AUTHENTICATED):{
            return{
                is_authenticated:true,
            }
        }
        case(IS_NOT_AUTHENTICATED):{
            return{
                is_authenticated:false,
            }
        }
        default : {
            return state
        }
    }
}


export const is_auth = (state:State) => state.is_authenticated