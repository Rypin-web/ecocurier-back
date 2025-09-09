import * as process from "node:process";
import {Sequelize} from "sequelize";

var database = process.env.DB_NAME || 'ecocourier'
var username = process.env.DB_USER || 'root'
var password = process.env.DB_PASSWORD || 'root'

export var sequelize = new Sequelize(database, username, password, {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
})

