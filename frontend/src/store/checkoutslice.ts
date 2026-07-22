import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../globals/types/types"
import type { checkoutdetails, myorderdatadetails, myorderdetails, orderdataitem } from "../types/checkouttype"
import type orderdetails from "../types/checkouttype"
import { APIAuthenticate } from "../http"

const initialstate:checkoutdetails={
    item:[],
    status:Status.LOADING,
    khaltiurl:null,
    orderdata:[],
    myorderdetails:[]
}

const checkoutslice=createSlice({
    name:'checkout',
    initialState:initialstate,
    reducers:{
        setcheckout(state:checkoutdetails,action:PayloadAction<orderdataitem[]>)
        {
            state.item=action.payload
        },
        setstatus(state:checkoutdetails,action:PayloadAction<checkoutdetails['status']>)
        {
            state.status=action.payload
        },
        setkhaltiurl(state:checkoutdetails,action:PayloadAction<checkoutdetails['khaltiurl']>)
        {
            state.khaltiurl=action.payload
        },
        setmyorder(state:checkoutdetails,action:PayloadAction<myorderdetails[]>)
        {
            state.orderdata=action.payload
        },
        setmyorderdetails(state:checkoutdetails,action:PayloadAction<myorderdatadetails[]>)
        {
            state.myorderdetails=action.payload
        }
    }
})

export const {setcheckout,setstatus,setkhaltiurl,setmyorder,setmyorderdetails}=checkoutslice.actions
export default checkoutslice.reducer

export function checkoutdata(data:orderdetails)
{
    return async function checkoutthunk(dispatch:any)
    {
        dispatch(setstatus(Status.LOADING))
        try {
            const response=await APIAuthenticate.post('/customer/order/',data)
            if(response.status==200)
            {
                dispatch(setstatus(Status.SUCESS))
                const {data}=response.data
                dispatch(setcheckout(data))
                if(response.data.url)
                {
                    dispatch(setkhaltiurl(response.data.url))
                }
                else{
                    dispatch(setkhaltiurl(null))
                }
            }
            
        } 
        catch (error) {
            setstatus(Status.ERROR)
        }
    }
}

export function getorderdetails()
{
    return async function getorderdetailsthunk(dispatch:any)
    {
        dispatch(setstatus(Status.LOADING))
        try {
            const response=await APIAuthenticate.get("customer/order")
            if(response.status==200)
            {
                dispatch(setstatus(Status.SUCESS))
                const {data}=response.data
                dispatch(setmyorder(data))
            }
            else{
                dispatch(setstatus(Status.ERROR))
            }
        } 
        catch (error) {
            dispatch(setstatus(Status.ERROR))
        }
    }
}


export function getmyorderdetails(id:any)
{
    return async function getmyorderdetailsthunk(dispatch:any)
    {
        dispatch(setstatus(Status.LOADING))
        try 
        {
            const response=await APIAuthenticate.get("customer/order/" +id)    
            if(response.status==200)
            {
                const {data}=response.data
                dispatch(setmyorderdetails(data))
                dispatch(setstatus(Status.SUCESS))
            }
            else
            {
                dispatch(setstatus(Status.ERROR))
            }
        } 
        catch (error) {
            dispatch(setstatus(Status.ERROR))
        }
    }
}