import type {Response,Request} from 'express'
import type{authenticateuser} from '../middleware/authmiddleware.js'
import type{OrderData} from '../types/orderdetails.js'
import {PaymentMethod} from '../types/orderdetails.js'
import type{Khalti} from '../types/orderdetails.js'
import type{verifytransactions} from '../types/orderdetails.js'
import {Status} from '../types/orderdetails.js'
import {Orderstatus} from '../types/orderdetails.js'
import {PaymentStatus} from '../types/orderdetails.js'
import Order from '../connection/models/order.js'
import Orderdetails from '../connection/models/orderdetails.js'
import Payment from '../connection/models/payment.js'
import Product from '../connection/models/Product.js'
import axios from 'axios'

class extradata extends Order
{
    declare paymentid:string |null
}
class Ordercontroller
{
    async createorder(req:authenticateuser,res:Response):Promise<void>
    {
        const uid=req.user?.id
        const {phonenumber,shippingaddr,totalamt,paymentdetails,items}:OrderData=req.body
        if(!phonenumber||!shippingaddr||!totalamt||!paymentdetails||items.length==0)
        {
            res.status(404).json({
                "message":"Please provide the details"
            })
            return
        }

        const paymentdata=await Payment.create({
            paymentmethod:paymentdetails.paymentmethod
        })

        const orderdata=await Order.create({
            phonenumber,
            shippingaddr,
            totalamt,
            paymentid:paymentdata.id,
            userId:uid
        })
        
        for(const item of items)
        {
            await Orderdetails.create({
                Quantity:item.quantity,
                productId:item.productid,
                orderId:orderdata.id
            })
        }

        if(paymentdetails.paymentmethod==PaymentMethod.Khalti)
        {
            // khalti payment integration
            const data={
                return_url:"http://localhost:3000/sucess",
                purchase_order_id:orderdata.id,
                amount:totalamt*100,
                website_url:"http://localhost:3000/",
                purchase_order_name:"testorder"
            }
            const response=await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
                headers:{
                    'Authorization':`key ${process.env.KHALTI_SCERET_KEY}`
                }
            })
            console.log(response)
            const khaltiresponse:Khalti=response.data
            paymentdata.pidx=String(khaltiresponse.pidx)
            paymentdata.save()
            res.status(200).json({
                "message":"order placed sucessfully",
                "url":khaltiresponse.payment_url
            })
        }
        else{
            res.status(200).json({
                "message":"Order placed sucessfully"
            })
        }

    }
    async verifytransaction(req:authenticateuser,res:Response):Promise<void>
    {
        const uid=req.user?.id
        const {pidx}=req.body
        if(!pidx)
        {
            res.status(400).json({
                "message":"Please provide credentials"
            })
            return
        }
        const response=await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx},{
            headers:{
                'Authorization':`key ${process.env.KHALTI_SCERET_KEY}`
            }
        })
        console.log(response)
        const verifyresponse:verifytransactions=response.data
        if(verifyresponse.status==Status.Completed)
        {
            await Payment.update({paymentstatus:'paid'},{
                where:{
                    pidx:pidx
                }
            })
            res.status(200).json({
                "message":"Payment verified sucessfully"
            })
        }
        else{
            res.status(200).json({
                "message":"Payment not verified"
            })
        }
    }
// customter side starts
    async getorder(req:authenticateuser,res:Response):Promise<void>
    {
        const uid=req.user?.id
        const data=await Order.findAll({
            where:{
                userId:uid
            },
            include:[{
                model:Payment
            }]
        })
        if(data.length==0)
        {
            res.status(404).json({
                "message":"No products selected"
            }
            )
            return
        }
        res.status(200).json({
            "message":"Order fetched sucessfully",
            data:data
        })
    }
    async getorderdetails(req:authenticateuser,res:Response):Promise<void>
    {
        const orderid=req.params.id
        const data=await Orderdetails.findAll({
            where:{
                orderId:orderid
            },
            include:[{
                model:Product,
                attributes:['Productname','ProductDescription','Price']
            }]
        })
        if(data.length==0)
        {
            res.status(404).json({
                "message":"No products selected",
                data:[]
            }
            )
            return
        }
        res.status(200).json({
            "message":"Order fetched sucessfully",
            data:data
        })
    }
    async cancelorder(req:authenticateuser,res:Response):Promise<void>
    {
        const orderid=req.params.id
        const uid=req.user?.id
        const data:any=await Order.findAll({
            where:{
                id:orderid,
                userId:uid
            }
        })
        if(data.length==0)
        {
            res.status(404).json({
                "message":"No products available",
                "data":[]
            })
            return
        }
        if(data.orderstatus==Orderstatus.ontheway||data.orderstatus==Orderstatus.processing)
        {
            res.status(200).json({
                "message":"You cannot cancel order"
            })
            return
        }
        const response=await Order.update({orderstatus:Orderstatus.cancel},{
            where:{
                userId:uid,
                id:orderid
            }
        })
        res.status(200).json({
            "message":"Order cancelled sucessfully",
            data:response
        })
    }
// customer side ends

// admin side starts

    async orderstatus(req:Request,res:Response):Promise<void>
    {
        const orderid=req.params.id as string
        const {status}=req.body
        if(!status)
        {
            res.status(200).json({
                "message":"Provide the status"
            })
            return
        }
        const data=await Order.update({orderstatus:status},{
            where:{
                id:orderid
            }
        })
        res.status(200).json({
            "message":"Order status updated sucessfully"
        })
    }

    async paymentstatus(req:Request,res:Response):Promise<void>
    {
        const orderid=req.params.id as string
        const {status}=req.body as {status:PaymentStatus}
        if(!status)
        {
            res.status(200).json({
                "message":"Provide payment status"
            })
            return
        }
        const data=await Order.findByPk(orderid)
        const newextradata:extradata=data as extradata
        const response=await Payment.update({paymentstatus:status},{
            where:{
                id:newextradata.paymentid
            }
        })
        res.status(200).json({
            "message":`Payment status of orderid ${orderid} updated sucessfully`
        })
    }
    async deleteorder(req:Request,res:Response):Promise<void>
    {
        const orderid=req.params.id as string
        const data=await Order.findByPk(orderid)
        const newdata:extradata=data as extradata
        if(data)
        {
        await Order.destroy({
            where:{
                id:orderid
            }
        })
        await Orderdetails.destroy({
            where:{
                orderid:orderid
            }
        })
        await Payment.destroy({
            where:{
                id:newdata.paymentid
            }
        })
        res.status(200).json({
            "message":"Order deleted sucessfully"
        })
        }

    }

// admin side ends
}
export default new Ordercontroller