import type{Request,Response} from 'express'
import Product from '../connection/models/Product.js'
import authenticateuser from '../middleware/authmiddleware.js'
import User from '../connection/models/model.js'
import Catergory from '../connection/models/catergory.js'
import fs from "fs"
import {fileURLToPath} from 'url'
import path from 'path'
// interface addproduct extends Request
// {
//     file?:Express.Multer.File
// }

// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.join(__filename)

class Productcontroller
{
    async addProduct(req:Request,res:Response,next:Function):Promise<void>
    {
        const {productname,productdescription,price,quantity,Catergoryid,uid}=req.body
        // const uid=req.body?.id
        let filename=(req as any).file?.filename
        if(!filename)
        {
            filename="urls"
        }
        if(!productname||!price||!quantity||!productdescription||!Catergoryid)
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
            Imageurl:filename,
            UserId:uid,
            Catergoryid:Catergoryid
        })
        if(result)
        {
            res.status(200).json({
            "message":"Data added sucessfully"
        })
        }
    }

    async getallproducts(req:Request,res:Response):Promise<void>
    {
        const data=await Product.findAll(
            {
                include:[
                    {
                        model:User,
                        attributes:['username','email']
                    },
                    {
                        model:Catergory,
                        attributes:['CatergoryName']
                    }
                ]
            }
        )
        res.status(200).json(
            {
                "message":"All Products retrieved",
                "data":data
            }
        )
    }

    async getsingleproduct(req:Request,res:Response):Promise<void>
    {
        const id=req.params.id
        const data=await Product.findOne(
            {
                where:{
                    id:id
                },
                include:[
                    {
                    model:User,
                    attributes:['username','email']
                    },
                    {
                        model:Catergory,
                        attributes:['CatergoryName']
                    }
                ]
            })
        if(!data)
        {
            res.status(404).json(
                {
                    "message":"Product no available"
                }
            )}
        else{
            res.status(200).json(
                {
                    "message":"Product fetched sucessfully",
                    data:data
                }
            )
        } 
    }

    async deletesingleproduct(req:Request,res:Response):Promise<void>
    {
        const id=req.params.id
        const data=await Product.findAll(
            {
                where:{
                    id:id
                }
            })
        if(data){
            Product.destroy({
                where:{
                    id:id
                }
            })
            res.status(200).json({
                "message":"Product deleted sucessfully"
            })
        }
        else{
            res.status(404).json({
                "message":"Product not found"
            })
        }
    }

    async updatesingleproduct(req:Request,res:Response,next:Function):Promise<void>
    {
        const id=req.params.id as string
        const {productname,price,productdescription,quantity,Catergoryid}=req.body
        const uid=req.body?.id
        if(!productname||!price||!quantity||!productdescription||!Catergoryid)
        {
            res.status(400).json(
                {
                    "message":"Please provide the details"
                })
            return
        }
        console.log(typeof(id))
        const olddata=await Product.findByPk(id)
        if(!olddata)
        {
            res.status(404).json({
                "message":"No product available"
            })
            return
        }
    let filename = olddata.Imageurl;
    try {
    if ((req as any).file) {
        try {
            const filepath=path.join(process.cwd(),"src","storage",filename)
            await fs.promises.unlink(filepath);
            console.log("Deleted:", `storage/${filename}`);
        } catch (err: any) {
            // Only log, DO NOT stop execution
            if (err.code === "ENOENT") {
                console.log("File not found, skip delete");
            } else {
                console.log("Delete error:", err);
            }
        }

        filename = (req as any).file.filename;
        }

        // Update DB AFTER file handling
        await Product.update({
            productName: productname,
            price:price,
            ProductDescription: productdescription,
            stock: quantity,
            Imageurl: filename,
            Catergoryid:Catergoryid,
            Userid:uid
        }, {
            where: { id }
        });
        res.status(200).json({
            message: "Product updated successfully"
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error while updating product"
        });
    }
    }}
export default new Productcontroller()