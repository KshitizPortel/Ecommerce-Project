import type {Response} from 'express'
import type{authenticateuser} from '../middleware/authmiddleware.js'
import type{OrderData} from '../types/orderdetails.js'
import {PaymentMethod} from '../types/orderdetails.js'
import type{Khalti} from '../types/orderdetails.js'
import Order from '../connection/models/order.js'
import Orderdetails from '../connection/models/orderdetails.js'
import Payment from '../connection/models/payment.js'
import axios from 'axios'
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
                    'Authorization':'key 2545b7674eff41db9715e4c157015995'
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
}

export default new Ordercontroller