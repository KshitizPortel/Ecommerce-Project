import express from 'express'
import type {Application,Request,Response} from 'express'
import './init.js'

// import db from './model/index.js'
import sequelize from './connection/connect.js'
import userroute from './routes/route.js'
import adminseeder from './adminseeder.js'
const app:Application=express()
app.use(express.json())

// app.get("/",(req:Request,res:Response)=>
// {
//     res.send("This is our requested data")
// })
// http://localhost/register
app.use("",userroute)


// calling admin seeder
adminseeder()

app.listen(3000,()=>
{
    console.log("Hello from the port 3000")
})

