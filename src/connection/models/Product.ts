import {Table,Model,DataType,Column} from 'Sequelize-typescript'

@Table({
    tableName:'products',
    timestamps:true
})

class Product extends Model{
    @Column(
        {
            primaryKey:true,
            type:DataType.UUID,
            defaultValue:DataType.UUIDV4
        }
    )
    declare id:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    declare ProductName:string

    @Column({
        type:DataType.TEXT
    })
    declare ProductDescription:string

    @Column({
        type:DataType.INTEGER
    })
    declare Price:number

    @Column({
        type:DataType.INTEGER
    })
    declare Stock: number

    @Column({
        type:DataType.STRING
    })
    declare Imageurl:string
}

export default Product