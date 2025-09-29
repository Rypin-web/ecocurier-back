import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes, ForeignKey
} from "sequelize";
import {sequelize} from "@config/database";
import {User} from "@models/User";

export class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    declare id: CreationOptional<string>
    declare userId: ForeignKey<User['id']>
    declare refreshToken: string | null
    declare fingerprint: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}

Session.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId:{
        type: DataTypes.UUID,
        references:{
            model: User,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
        field:'user_id'
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fingerprint: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'sessions'
})