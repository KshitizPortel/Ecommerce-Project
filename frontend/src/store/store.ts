import {configureStore} from '@reduxjs/toolkit'
import authslice from './auth.js'
import productslice from './productslice.js'
const store=configureStore({
    reducer:{
        auth:authslice,
        products:productslice
    }
})

export default store

export type Appdispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>