import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {sequelize} from "@config/database";
import {User} from "@models/User";

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<string>
    declare userId: string
    declare status: string
    declare totalPrice: number
    declare deliveryAddress: string
    declare courierId: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Order.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deliveryAddress: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    courierId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    timestamps: true,
    tableName: 'orders'
})