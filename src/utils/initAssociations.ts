import {Session} from "@models/Session";
import {User} from "@models/User";
import {Categories} from "@models/Categories";
import {Products} from "@models/Products";

export function initAssociations () {
    User.hasMany(Session, {foreignKey: 'user_id'})
    Session.belongsTo(User, {foreignKey: 'user_id'})
    Categories.hasMany(Products, {foreignKey: 'category_id'})
    Products.belongsTo(Categories, {foreignKey: 'category_id'})
}