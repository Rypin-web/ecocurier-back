import {Session} from "@models/Session";
import {User} from "@models/User";
import {Categories} from "@models/Categories";
import {Products} from "@models/Products";
import {Basket} from "@models/Basket";

export function initAssociations () {
    User.hasMany(Session, {foreignKey: 'user_id'})
    Session.belongsTo(User, {foreignKey: 'user_id'})

    Categories.hasMany(Products, {foreignKey: 'category_id'})
    Products.belongsTo(Categories, {foreignKey: 'category_id'})

    User.hasMany(Basket, {foreignKey: 'user_id'})
    Products.hasMany(Basket, {foreignKey: 'product_id'})
    Basket.belongsTo(User, {foreignKey: 'user_id'})
    Basket.belongsTo(Products, {foreignKey: 'product_id'})
}