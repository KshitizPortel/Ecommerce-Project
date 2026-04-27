import type{Request,Response} from 'express'
import Product from '../connection/models/Product.js'
// interface addproduct extends Request
// {
//     file?:Express.Multer.File
// }

class Productcontroller
{
    async addProduct(req:Request,res:Response,next:Function):Promise<void>
    {
        const {productname,productdescription,price,quantity}=req.body
        let filename=(req as any).file?.filename
        if(!filename)
        {
            filename="urls"
        }
        if(!productname||!price||!quantity||!productdescription)
        {
            res.status(400).json(
                {
                    "message":"Please provide the details"
                })
            return
        }
        let result =await Product.create({
            ProductName:productname,
            ProductDescription:productdescription,
            Stock:Number(quantity),
            Price:Number(price),
            Imageurl:filename
        })
        if(result)
        {
            res.status(200).json({
            "message":"Data added sucessfully"
        })
        }
    }
}

export default new Productcontroller