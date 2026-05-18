import {Table,Column,DataType,Model} from 'Sequelize-typescript'

@Table({
    tableName:'cart',
    modelName:'Cart',
    timestamps:true
})

class Cart extends Model
{
@Column({
    type:DataType.UUID,
    defaultValue:DataType.UUIDV4,
    primaryKey:true
})
declare id:string

@Column({
    type:DataType.INTEGER
})
declare Quantity:number
}

export default Cart