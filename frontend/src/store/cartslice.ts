import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import type { cartitem, carttype } from "../types/carttype";
import type { Appdispatch } from "./store";
import { APIAuthenticate } from "../http";
import { setStatus } from "./auth";

const initialstate:carttype={
    item:[],
    status:Status.LOADING
}
interface DeleteAction
{
    productid:string
}

interface UpdateAction extends DeleteAction
{
    quantity:number
}
const cartslice=createSlice({
    name:'cartslice',
    initialState:initialstate,
    reducers:{
        setcart(state:carttype,action:PayloadAction<cartitem[]>)
        {
            state.item=action.payload
        },
        setstatus(state:carttype,action:PayloadAction<Status>)
        {
            state.status=action.payload
        },
        setdeletecart(state:carttype,action:PayloadAction<DeleteAction>)
        {
            const index=state.item.findIndex((data)=>
            {
                if(data.Product.id==action.payload.productid)
                {
                    return true
                }
                else{
                    return false
                }
            })
            state.item.splice(index,1)
        },
        setupdatecart(state:carttype,action:PayloadAction<UpdateAction>)
        {
            const index=state.item.findIndex((data)=>
            {
                if(data.Product.id==action.payload.productid){
                    return true
                }
                else{
                    return false
                }
            })
            if(index!==1)
            {
                state.item[index].Product.Stock=action.payload.quantity
            }
        }
    }
})

export const {setcart,setstatus,setdeletecart,setupdatecart}=cartslice.actions
export default cartslice.reducer

export function addtocart(productid:string)
{
    return async function addtocartthunk(dispatch:Appdispatch)
    {
        dispatch(setstatus(Status.LOADING))
        try
        {
        const response=await APIAuthenticate.post("customer/cart/",{
            productid,
            quantity:1
        })
        if(response.status==200)
        {
            dispatch(setStatus(Status.SUCESS))
            const {data}=response.data
            dispatch(setcart(data))
        }
        else
        {
            dispatch(setstatus(Status.ERROR))
        }
        }
        catch(err)
        {
            dispatch(setstatus(Status.ERROR))
        }
    }
}

export function deletecartitem(productid:string)
{
    return async function deletecartitemthunk(dispatch:any)
    {
        dispatch(setStatus(Status.LOADING))
        try
        {
            const response=await APIAuthenticate.delete('customer/cart/'+ productid)   
            if(response.status==200) 
            {
                dispatch(setStatus(Status.SUCESS))
                dispatch(setdeletecart({productid}))
            }
            else{
                dispatch(setstatus(Status.ERROR))
            }
        } 
        catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function updatecartitem(productid:string,quantity:number)
{
    return async function updatecartitemthunk(dispatch:any)
    {
        dispatch(setStatus(Status.LOADING))
        try
        {
            const response=await APIAuthenticate.patch('customer/cart/'+ productid,{
                quantity
            })   
            if(response.status==200) 
            {
                dispatch(setStatus(Status.SUCESS))
                dispatch(setupdatecart({productid,quantity}))
            }
            else{
                dispatch(setstatus(Status.ERROR))
            }
        } 
        catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}