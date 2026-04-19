import {Sequelize} from 'Sequelize-typescript'
import {fileURLToPath} from 'url'
import path from 'path'
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const sequelize=new Sequelize({
    database:process.env.DB_NAME as string,
    host:process.env.DB_HOST as string,
    username:process.env.DB_USERNAME as string,
    password:process.env.DB_PASSWORD || '',
    dialect:'mysql',
    port:Number(process.env.DB_PORT),
    models:[path.join(__dirname,"models")]
})
sequelize.authenticate()
.then(()=>
{
    console.log("authenticated")
})
.catch((err)=>
{
    console.log(err)
})
sequelize.sync({force:false})
.then(()=>
{
    console.log("migrated")
})
export default sequelize

// console.log(process.env.DB_USERNAME)
