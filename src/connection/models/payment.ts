import {Table,Column,DataType,Model} from 'Sequelize-typescript'

@Table(
    {
        tableName:'payment',
        modelName:'Payment',
        timestamps:true
    })

class Payment extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4 
    })
    declare id:string

    @Column({
        type:DataType.STRING
    })
    declare pidx:string

    @Column({
        type:DataType.ENUM('COD','Khalti','Esewa'),
        allowNull:false
    })
    declare paymentmethod:string

    @Column({
        type:DataType.ENUM('paid','unpaid'),
        defaultValue:'unpaid'
    })
    declare paymentstatus:string
}

export default Payment