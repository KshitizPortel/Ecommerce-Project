import {createSlice} from '@reduxjs/toolkit'
import type{PayloadAction} from '@reduxjs/toolkit'
import API from '../http'
import { Status } from '../globals/types/types'
import axios from 'axios'

interface Register
{
    username:string,
    email:string,
    password:string
}
interface Login
{
    email:string,
    password:string
}
interface User
{
    username:string,
    email:string,
    password:string,
    token:string
}
interface authuser
{
    user:User,
    status:Status
}
const initialState:authuser={
    user:{} as User,
    status:Status.LOADING
}
const authslice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser(state:authuser,action:PayloadAction<User>){
            state.user=action.payload 
        },
        setStatus(state:authuser,action:PayloadAction<Status>){
            state.status=action.payload
        },
        resetStatus(state:authuser)
        {
            state.status=Status.LOADING
        },
        setToken(state:authuser,action:PayloadAction<string>)
        {
            state.user.token=action.payload
        }
    }
})
export const {setUser,setStatus,resetStatus,setToken}=authslice.actions
export default authslice.reducer

export function register(data:Register)
{
    return async function registerThunk(dispatch:any)
    {
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("register",data)
            if(response.status==200)
            {
                dispatch(setStatus(Status.SUCESS))
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }
        } 
        catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function login(data:Login)
{
    return async function loginThunk(dispatch:any)
    {
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("login",data)
            const {jwtdata}=response.data
            if(response.status==200)
            {
                dispatch(setStatus(Status.SUCESS))
                dispatch(setToken(jwtdata))
                localStorage.setItem("token",jwtdata)
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }

        } 
        catch (error) {
            dispatch(Status.ERROR)
        }
    }
}