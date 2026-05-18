import {Table,Column,DataType,Model} from 'Sequelize-typescript'

@Table({
        tableName:'catergories',
        modelName:'Catergory',
        timestamps:true
    })

class Catergory extends Model
{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type:DataType.STRING
    })
    declare CatergoryName:string
}

export default  Catergory