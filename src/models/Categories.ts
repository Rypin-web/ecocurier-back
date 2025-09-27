import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes
} from 'sequelize'
import {sequelize} from "@config/database";

export class Categories extends Model<InferAttributes<Categories>, InferCreationAttributes<Categories>> {
    declare id: CreationOptional<string>
    declare name: string
    declare description: CreationOptional<string>
    declare image: CreationOptional<string>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Categories.init({
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(255),
        unique:true,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
    },
    image:{
        type: DataTypes.STRING(128),
        defaultValue:'Unset',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName:'categories'
})