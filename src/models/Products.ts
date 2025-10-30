import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {sequelize} from "@config/database";
import {Categories} from "@models/Categories";

export class Products extends Model<InferAttributes<Products>, InferCreationAttributes<Products>> {
    declare id: CreationOptional<string>
    declare title: string
    declare description: CreationOptional<string>
    declare price: number
    declare image: CreationOptional<string>
    declare category_id: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Products.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: 'Unset'
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'Price must be greater than or equal to 0'
            }
        }
    },
    image: {
        type: DataTypes.STRING(128),
        defaultValue: 'Unset'
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Categories,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    timestamps: true,
    modelName: 'products'
})