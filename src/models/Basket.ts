import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes
} from 'sequelize'
import {sequelize} from "@config/database";
import {User} from "@models/User";
import {Products} from "@models/Products";

export class Basket extends  Model<InferAttributes<Basket>, InferCreationAttributes<Basket>>{
    declare id: CreationOptional<string>
    declare userId: string
    declare productId: string
    declare quantity : number
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Basket.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        references:{
            model: User,
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field:'user_id'
    },
    productId:{
        type: DataTypes.UUID,
        references:{
            model: Products,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field:'product_id'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: {
                args: [1],
                msg: 'Quantity must be greater than or equal to 1'
            }
        }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'baskets',
})
