import {createSlice} from '@reduxjs/toolkit'
import type{PayloadAction} from '@reduxjs/toolkit'

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
    status:string
}
const initialState:authuser={
    user:{} as User,
    status:"loading"
}
const authslice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser(state:authuser,action:PayloadAction<User>){
            state.user=action.payload 
        },
        setStatus(state:authuser,action:PayloadAction<string>){
            state.status=action.payload
        }
    }
})
export const {setUser,setStatus}=authslice.actions
export default authslice.reducer