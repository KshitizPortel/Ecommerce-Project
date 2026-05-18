import {Sequelize} from 'Sequelize-typescript'
import {fileURLToPath} from 'url'
import path from 'path'
import User from './models/model.js'
import Product from './models/Product.js'
import Catergory from './models/catergory.js'
import Cart from './models/cart.js'
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const sequelize=new Sequelize({
    database:process.env.DB_NAME as string,
    host:process.env.DB_HOST as string,
    username:process.env.DB_USERNAME as string,
    password:process.env.DB_PASSWORD || '',
    dialect:'mysql',
    port:Number(process.env.DB_PORT),
    models:[path.join(__dirname,"models")],
    // models:[User,Product]
})

console.log("MODELS:", sequelize.models)
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

// Relationships:
User.hasMany(Product)
Product.belongsTo(User)

Catergory.hasOne(Product,{foreignKey:'Catergoryid'})
Product.belongsTo(Catergory,{foreignKey:'Catergoryid'})

// relation of the table cart:

// relation with the product table:
Product.hasMany(Cart,{foreignKey:'Productid'})
Cart.belongsTo(Product,{foreignKey:'Productid'})

// relation with user table:
User.hasMany(Cart,{foreignKey:'Userid'})
Cart.belongsTo(User,{foreignKey:'Userid'})

export default sequelize

// console.log(process.env.DB_USERNAME)
