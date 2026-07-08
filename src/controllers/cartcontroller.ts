import type {Request,Response} from 'express'
import type {authenticateuser} from '../middleware/authmiddleware.js'
import cart from '../connection/models/cart.js'
import Product from '../connection/models/Product.js'
import User from '../connection/models/model.js'   

class Cart{
    async addtocart(req:authenticateuser,res:Response):Promise<void>
    {
        const userid=req.user?.id
        const {productid,quantity}=req.body
        console.log(req.body)
        const cartitem=await cart.findOne({
            where:{
                Userid:userid,
                Productid:productid
            }
        })
        console.log(productid)
        if(cartitem)
        {
            cartitem.Quantity+=quantity
            await cartitem.save()
        }
        else{
            const addcartitem=await cart.create({
                Userid:userid,
                Productid:productid,
                Quantity:quantity
            })
        }
            const data=await cart.findAll({
                where:{
                    Userid:userid
                },
                include:[{
                    model:Product
                }]
            })
            res.status(200).json({
                "message":"Product added to cart",
                data:data
        })
        }

    async getallitems(req:authenticateuser,res:Response):Promise<void>
    {
        const uid=req.user?.id
        const items=await cart.findAll({
            where:{
                userid:uid
            },
            include:[{
                model:Product,
                attributes:['ProductName','ProductDescription','Price']
            },
        {
            model:User,
            attributes:['username']
        }]
        })
        if(items.length==0)
        {
            res.status(404).json({
                "message":"No item in cart"
            })
        }
        else{
            res.status(200).json(
                {
                    "message":"Cart item fetched",
                    data:items
                })
        }
    }

    async deletecart(req:authenticateuser,res:Response):Promise<void>
    {
        const productid=req.params.id
        const uid=req.user?.id
        const data=await cart.findOne({
            where:{
                Productid:productid
            }
        })
        if(!data)
        {
            res.status(404).json({
                "message":"No product available"
            })
        }
        else{
            const deletedata=await cart.destroy({
                where:{
                    Userid:uid,
                    Productid:productid
                }
            })
            res.status(200).json({
                "message":"Cart deleted sucessfully"
            })
        }
    }

    async updatecart(req:authenticateuser,res:Response):Promise<void>
    {
        const cartid=req.params.id
        const uid=req.user?.id
        const {quantity}=req.body
        const data=cart.findOne({
            where:{
                id:cartid
            }
        })
        if(!data)
        {
            res.status(404).json({
                "message":"No product available"
            })
            return
        }
        else{
            const updatedata=await cart.update({Quantity:quantity},{
                where:{
                    Productid:cartid,
                    Userid:uid
                }
            })
            res.status(200).json({
                "message":"Cart updated sucessfully"
            })
        }
    }
}

export default new Cart()