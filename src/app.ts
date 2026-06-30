import express from 'express'
import type {Application,Request,Response} from 'express'
import './init.js'

import sequelize from './connection/connect.js'
import userroute from './routes/route.js'
import adminseeder from './adminseeder.js'
import productroute from './routes/productroute.js'
import catergoryclass from './controllers/catergorycontroller.js'
import catergoryroute from './routes/catergoryroute.js'
import cartroute from './routes/cartroute.js'
import orderroute from './routes/orderroute.js'
import cors from 'cors'

const app:Application=express()
app.use(express.json())

app.use(cors({
    origin:"*"
}))

// using the routes:
app.use("",userroute)               // http://localhost:3000/register
app.use("/admin/product",productroute)
app.use("/admin/catergory",catergoryroute)
app.use("/customer/cart",cartroute)
app.use("/customer/order",orderroute)

// calling admin seeder
adminseeder()

app.listen(3000,()=>
{
    catergoryclass.addcatergory()
    console.log("Hello from the port 3000")
})




// app.get("/",(req:Request,res:Response)=>
// {
//     res.send("This is our requested data")
// })