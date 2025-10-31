import {checkSchema} from "express-validator";

export var validateCreateProductFields = () => checkSchema({
    title: {
        notEmpty: true,
        isString: true,
        isLength:{
            options: {min: 3, max: 128},
            errorMessage: 'Title must be between 3 and 128 characters long'
        },
        errorMessage: 'Title is required',
    },
    description: {
        optional: true,
        isString: true,
        errorMessage: 'Description is required',
    },
    price: {
        notEmpty: true,
        isInt: {
            options: {min: 1, max: Infinity},
            errorMessage: 'Price must be a positive integer'
        },
        toInt: true,
        errorMessage: 'Price is required',
    },
    category_id: {
        notEmpty: true,
        isUUID: true,
        errorMessage: 'Category id is required',
    }
})

export var validateGetAllProductsFields = () => checkSchema({
    page: {
        notEmpty: {errorMessage: 'Page is required'},
        toInt: true,
        isInt: {options: {min: 1, max: Infinity}, errorMessage: 'Page must be an integer'},
    },
    limit: {
        notEmpty: {errorMessage: 'Limit is required'},
        toInt: true,
        isInt: {options: {min: 1, max: 100}, errorMessage: 'Limit must be an integer'},
    }
}, ['query'])