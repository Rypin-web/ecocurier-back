import * as process from "node:process";
import {Sequelize} from "sequelize";

export var sequelize = new Sequelize({
    database: process.env.DB_NAME || 'ecocourier',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
})

