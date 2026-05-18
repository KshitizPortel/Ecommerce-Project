import type{Request,Response} from 'express'
import Catergory from '../connection/models/catergory.js'
import User from '../connection/models/model.js'
class Catergoryclass
{
    catergorydata=[
        {
            CatergoryName:'Electronics'
        },
        {
            CatergoryName:'Groceries'
        },
        {
            CatergoryName:'Food/Beverages'
        },
        {
            CatergoryName:'Fashion'
        }
    ]
    async addcatergory():Promise<void>
    {
        const data=await Catergory.findAll()
        if(data.length===0)
        {
            await Catergory.bulkCreate(this.catergorydata)
            console.log(this.catergorydata)
            console.log("Catregory data seeded sucessfully")
        }
        else{
            console.log("Data already seeded")
        }
    }

    // crud operarion

    // create
    async addcatergories(req:Request,res:Response):Promise<void>
    {
        const id=req.params.id
        const {catergoryname}=req.body

        if(!catergoryname){
            res.status(404).json({"message":"Please add the catergory"})
            return
        }
        else{
            await Catergory.create({
                CatergoryName:catergoryname
            })
            res.status(200).json(
                {
                    "message":"Catergory added sucessfully"
                }
            )
        }
    }

    // get data:
    async getcatergory(req:Request,res:Response):Promise<void>
    {
        const id=req.params.id
        const data= await Catergory.findAll()
        if(!data){
            res.status(404).json({"message":"No product available"})
        }
        else{
            res.status(200).json(
                {
                    "message":"Catergory fetched sucessfully",
                    data:data
                }
            )
        }
    }

    // update data:
    async updatecatergory(req:Request,res:Response):Promise<void>
    {
        const id=req.params.id
        const {catergoryname}=req.body
        const data=Catergory.findOne({
            where:{
                id:id
            }
        })
        if(!data){
            res.status(404).json({"message":"No Catergory available"})
        }   
        else{
            console.log(catergoryname)
            const newdata=await Catergory.update({CatergoryName:catergoryname},{
                where:{
                    id:id
                }
            })
            res.status(200).json({"message":"catergory updated sucessfully",data:newdata})
        }
    }

    // delete data:
    async deletecatergory(req:Request,res:Response):Promise<void>
    {
        const id=req.params.id
        const data=Catergory.findAll({
            where:{
                id:id
            }
        })
        if(!data){
            res.status(404).json({"message":"No product available"})
        }
        else{
            await Catergory.destroy({
                where:{
                    id:id
                }
            })
            res.status(200).json({"message":"catergory deleted sucessfully"})
        }
    }
}

export default new Catergoryclass()