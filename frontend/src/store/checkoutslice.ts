import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../globals/types/types"
import type { checkoutdetails, orderdataitem } from "../types/checkouttype"
import type orderdetails from "../types/checkouttype"
import { APIAuthenticate } from "../http"

const initialstate:checkoutdetails={
    item:[],
    status:Status.LOADING,
    khaltiurl:null
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
        }
    }
})

export const {setcheckout,setstatus,setkhaltiurl}=checkoutslice.actions
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