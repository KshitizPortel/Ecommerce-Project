import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import type { Product, Productstate } from "../types/producttypes";
import {API} from "../http";
import type { Appdispatch, RootState } from "./store";

const initialstate:Productstate=
{
    product:[],
    status:Status.LOADING,
    singleproduct:null
}

const productslice=createSlice({
    name:'product',
    initialState:initialstate,
    reducers:{
        setProduct(state:Productstate,action:PayloadAction<Product[]>)
        {
            state.product=action.payload
        },
        setStatus(state:Productstate,action:PayloadAction<Status>)
        {
            state.status=action.payload
        },
        setSingleproduct(state:Productstate,action:PayloadAction<Product>)
        {
            state.singleproduct=action.payload
            console.log(action.payload)
        }
    }
})

export const {setProduct,setStatus,setSingleproduct}=productslice.actions
export default productslice.reducer

export function fetchproducts()
{
    return async function fetchproductsthunk(dispatch:Appdispatch)
    {
        try{
            const response=await API.get("admin/product")
            if(response.status===200)
            {
                const {data}=response.data
                dispatch(setProduct(data))
                dispatch(setStatus(Status.SUCESS))
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }
        }
        catch(err)
        {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchproductbyid(productid:string)
{
    return async function fetchproductbyid(dispatch:Appdispatch,getState:()=>RootState)
    {
        const state=getState()
        const existingproduct=state.products.product.find((product:Product)=>
        {
            if(productid==product.id)
            {
                return true
            }
            else{
                return false
            }
        })
        if(existingproduct)
        {
            dispatch(setSingleproduct(existingproduct))
            dispatch(setStatus(Status.SUCESS))
        }
        else{
            try
            {
                const response=await API.get(`admin/product/${productid}`)
                if(response.status===200)
                {
                    const {data}=response.data
                    dispatch(setSingleproduct(data))
                    dispatch(setStatus(Status.SUCESS))
                    console.log(response.data)
                    console.log(data)
                }
                else
                {
                    dispatch(setStatus(Status.ERROR))
                }

            }
            catch(err)
            {
                dispatch(setStatus(Status.ERROR))
            }

        }

    }
}