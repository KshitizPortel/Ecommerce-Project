import {Model,Table,DataType,Column} from 'Sequelize-typescript'
@Table({
    tableName:'orderdetails',
    modelName:'Orderdetails',
    timestamps:true
})

class Orderdetails extends Model
{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column(
        {
            type:DataType.INTEGER,
            allowNull:false
        })
        declare Quantity:number
}

export default Orderdetails