import {configureStore} from '@reduxjs/toolkit'
import authslice from './auth.js'
import productslice from './productslice.js'
import cartslice from './cartslice.js'
const store=configureStore({
    reducer:{
        auth:authslice,
        products:productslice,
        carts:cartslice
    }
})

export default store

export type Appdispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>