import {Session} from "@models/Session";
import {User} from "@models/User";
import {Categories} from "@models/Categories";
import {Products} from "@models/Products";
import {Basket} from "@models/Basket";
import {Order} from "@models/Order";
import {OrderItem} from "@models/OrderItem";

export function initAssociations () {
    User.hasMany(Session, {foreignKey: 'user_id'})
    Session.belongsTo(User, {foreignKey: 'user_id'})

    Categories.hasMany(Products, {foreignKey: 'category_id'})
    Products.belongsTo(Categories, {foreignKey: 'category_id'})

    User.hasMany(Basket, {foreignKey: 'user_id'})
    Products.hasMany(Basket, {foreignKey: 'product_id'})
    Basket.belongsTo(User, {foreignKey: 'user_id'})
    Basket.belongsTo(Products, {foreignKey: 'product_id'})

    User.hasMany(Order, {foreignKey: 'userId', as: 'orders'})
    User.hasOne(Order, {foreignKey: 'courierId', as: 'deliveries'})
    Order.belongsTo(User, {foreignKey: 'userId', as: 'customer'})
    Order.belongsTo(User, {foreignKey: 'courierId', as: 'courier'})

    Order.hasMany(OrderItem, {foreignKey: 'orderId', as: 'items'})
    OrderItem.belongsTo(Order, {foreignKey: 'orderId', as: 'order'})

    Products.hasMany(OrderItem, {foreignKey: 'productId', as: 'orderItems'})
    OrderItem.belongsTo(Products, {foreignKey: 'productId', as: 'product'})
}