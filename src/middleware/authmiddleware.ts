import type{Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import User from '../connection/models/model.js'
export interface authenticateuser extends Request{
    user?:
    {
        username:string,
        role:string,
        email:string,
        password:string,
        id:string
    }}
export enum Role {
    Admin="admin",
    Customer="customer"
}
class Authenticateuser
{
    async isAuthenticated(req:authenticateuser,res:Response,next:Function):Promise<void>
    {
        // get token
        const token=req.headers.authorization    // -- getting the token
        if(!token ||token=="undefined")
        {
            res.status(403).json({
                "message":"Token not found"
            })
            return 
        }
        // verify token
        const tokendata=jwt.verify(token,process.env.SECRET_KEY  as string,async (err,decoded:any)=>
        {
            if(err)
            {
                res.status(403).json({
                    "message":"Token not matched"
                })
                return
            }
            try {
            const userdata=await User.findByPk(decoded.id)
                if(!userdata)
                {
                    res.status(403).json({
                        "message":"No user data found"
                    })
                    return
                }
                req.user=userdata       //-- now the additional data, called user is also added to the request object.

                // next
                next()
            } 
            catch (err) {
                res.status(500).send("Something went wrong")
            }
        })
    }
    restrictTo(...roles:Role[])
    {
        return(req:authenticateuser,res:Response,next:Function)=>
        {
            let userrole=req.user?.role as Role
            if(!roles.includes(userrole))
            {
                res.status(404).json(
                    {
                        "message":"You do not have the permission"
                    }
                )
                console.log(userrole,roles)
                return
            }
            else{
                next()
            }}}}
export default new Authenticateuser