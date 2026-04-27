import express from 'express'
import type {Application,Request,Response} from 'express'
import './init.js'

import sequelize from './connection/connect.js'
import userroute from './routes/route.js'
import adminseeder from './adminseeder.js'
import productroute from './routes/productroute.js'

const app:Application=express()
app.use(express.json())

// using the routes:
app.use("",userroute)               // http://localhost/register
app.use("/admin/product",productroute)

// calling admin seeder
adminseeder()

app.listen(3000,()=>
{
    console.log("Hello from the port 3000")
})




// app.get("/",(req:Request,res:Response)=>
// {
//     res.send("This is our requested data")
// })