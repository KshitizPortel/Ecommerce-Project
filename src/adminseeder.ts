import User from './connection/models/model.js'
import bcrypt from 'bcrypt'
const adminseeder=async ():Promise<void> =>
{
    const [data]=await User.findAll({
        where:{
            role:"admin"
        }
    })
    if(!data)
    {
        await User.create({
            username:"firstadmin",
            email:"admin@gmail.com",
            password:bcrypt.hashSync('admin123',8),
            role:'admin'
        })
        console.log("Admin seeded sucessfully")
    }
    else{
        console.log("Admin already seeded")
    }
}

export default adminseeder