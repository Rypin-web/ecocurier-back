import {checkSchema} from "express-validator";

export var validateCreateCategoryFields = () => checkSchema({
    name: {
        notEmpty: {errorMessage: 'Name is required'},
        isLength: {
            options: {min: 2, max: 255},
            errorMessage: 'Name must be between 2 and 255 characters long'
        },
        trim: true,
    },
    description: {
        optional: true,
        isLength: {
            options: {max: 10000},
            errorMessage: 'Description is too long'
        },
        trim: true,
    },
}, ['body'])

export var validateGetAllCategoriesFields = () => checkSchema({
    page: {
        notEmpty: true,
        isInt: true,
        toInt: true,
        isLength: {options: {min: 1, max: Infinity}},
        errorMessage: 'Page must be a positive integer'
    },
    limit: {
        notEmpty: true,
        isInt: true,
        toInt: true,
        isLength: {options: {min: 1, max: 20}},
        errorMessage: 'Limit must be a positive integer between 1 and 100'
    }
}, ['query'])

export var validateUpdateCategoryFields = () => checkSchema({
    name: {
        in: 'body',
        notEmpty: true,
        isLength: {
            options: {min: 2, max: 255},
            errorMessage: 'Name must be between 2 and 255 characters long'
        },
        trim: true,
    },
    description: {
        in: 'body',
        optional: true,
        isLength: {
            options: {max: 10000},
            errorMessage: 'Description is too long'
        },
        trim: true,
    },
    id: {
        in: 'params',
        notEmpty: true,
        isUUID: true,
        errorMessage: 'Category id is required',
    }
})

export var validateDeleteCategoryFields = ()=> checkSchema({
    id: {
        in: 'params',
        notEmpty: true,
        isUUID: true,
        errorMessage: 'Category id is required',
    }
})