import {configureStore} from '@reduxjs/toolkit'
import authslice from './auth.js'

const store=configureStore({
    reducer:{
        auth:authslice
    }
})

export default store

export type Appdispatch=typeof store.dispatch
export type Appselector=ReturnType<typeof store.getState>