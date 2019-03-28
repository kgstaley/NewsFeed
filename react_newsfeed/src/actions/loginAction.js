import {LOGIN_USER} from './actionTypes';
import * as userService from "../services/userServices";


const login = payload => {
    return dispatch => {
        return userService.login(payload).then(res=>{
            dispatch(logUserInSuccess(res))
        }).catch(err=>{
            throw err; 
        })
    }
}

const logUserInSuccess = res => {
    return {
        type: LOGIN_USER,
        payload: {
            
        }
    }
}



