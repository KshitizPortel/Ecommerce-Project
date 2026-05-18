import type {Request,Response} from 'express'
import User from '../connection/models/model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthenticateUser{
    public static async registeruser(req:Request,res:Response):Promise<void>{
        const {username,email,password,role}=req.body
        if(!username||!email||!password)
        {
            res.status(404).json({
                "message":"Please send the data"
            })
            return
        }
        const [data] = await User.findAll({
            where:{
                email:email
            }})
        if(data){
            res.json({
                "message":"User already registered. Try with new email"
            })
            return
        }
            await User.create({
                username,
                email,
                password:bcrypt.hashSync(password,8),
                role:role
            })
            res.status(200).json({
            "message":"Data received sucessfully"
        })}

    public static async loginuser(req:Request,res:Response):Promise<void>
    {
        const {email,password}=req.body
        if(!email||!password)
        {
            res.status(404).json(
                {
                    "message":"Send the email and password"
                }
            )
            return
        }
        const data= await User.findOne({
            where:{ 
                email:email
            },
            attributes:['id','password']
        })
        if(!data)
        {
            res.status(404).json({
                "message":"email not found"
            })
            return
        }
        const userresponse={
            id:data.id
        }
        const ismatched=bcrypt.compareSync(password,data.password)
        console.log(data.password,data.id)
        if(!ismatched)
        {
            res.status(404).json({
                "message":"Invalid Password"
            })
            return
        }

        // Generate token:
        const jwtdata=jwt.sign({id:data.id},process.env.SECRET_KEY as string,{
            expiresIn:'10d'
        })
        res.status(200).json({
            "message":"Use loggedin sucessfully",
            data:userresponse,
            jwtdata:jwtdata
        })
    }}
export default AuthenticateUser