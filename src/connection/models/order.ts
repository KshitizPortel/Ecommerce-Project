import {Table,Model,DataType,Column} from 'Sequelize-typescript'

@Table({
    tableName:'order',
    modelName:'Order',
    timestamps:true
})

class Order extends Model
{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4 
    })
    declare id:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare phonenumber:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare shippingaddr:string

    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    declare totalamt:number

    
    @Column({
        type:DataType.ENUM('pending','cancel','delivered','processing'),
        defaultValue:'pending'
    })
    declare orderstatus:number
}

export default Order
