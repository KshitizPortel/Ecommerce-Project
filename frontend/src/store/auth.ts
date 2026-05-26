import {createSlice} from '@reduxjs/toolkit'
import type{PayloadAction} from '@reduxjs/toolkit'
import API from '../http'

interface Register
{
    name:string,
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
type Status="sucess"|"error"|"loading"|""
interface authuser
{
    user:User,
    status:Status
}
const initialState:authuser={
    user:{} as User,
    status:""
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
        }
    }
})
export const {setUser,setStatus}=authslice.actions
export default authslice.reducer

export function register(data:Register)
{
    return async function registerThunk(dispatch:any)
    {
        dispatch(setStatus("loading"))
        try {
            const response=await API.post("register",data)
            if(response.status==201)
            {
                dispatch(setStatus("sucess"))
            }
            else{
                dispatch(setStatus("error"))
            }
        } 
        catch (error) {
            dispatch(setStatus("error"))
        }
    }
}

export function login(data:Login)
{
    return async function loginThunk(dispatch:any)
    {
        dispatch(setStatus("loading"))
        try {
            const response=await API.post("login",data)
            if(response.status==200)
            {
                dispatch(setStatus("sucess"))
            }
            else{
                dispatch(setStatus("error"))
            }

        } 
        catch (error) {
            dispatch("error")
        }
    }
}