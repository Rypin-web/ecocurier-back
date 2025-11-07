import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes
} from "sequelize";
import {sequelize} from "@config/database";

export class User extends Model<InferAttributes<User>,InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare role: 'user' | 'admin';
    declare first_name: string;
    declare last_name: CreationOptional<string>;
    declare phone: string;
    declare email: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'courier'),
        allowNull:false,
    },
    first_name:{
        type: new DataTypes.STRING(128),
        allowNull:false
    },
    last_name: {
        type: new DataTypes.STRING(128),
        allowNull:true
    },
    phone: {
        type: new DataTypes.STRING(32),
        allowNull: false
    },
    email:{
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail:{
                msg:'Email is not valid'
            }
        }
    },
    password:{
        type: new DataTypes.STRING(200),
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName:'users'
})