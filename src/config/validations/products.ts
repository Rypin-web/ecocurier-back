import {checkSchema} from "express-validator";

export var validateCreateProductFields = () => checkSchema({
    title: {
        notEmpty: true,
        isString: true,
        isLength: {
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

export var validateDeleteProductFields = () => checkSchema({
    id: {
        in: 'params',
        notEmpty: true,
        isUUID: true,
        errorMessage: 'Product id is required',
    }
})

export var validateUpdateProductFields = () => checkSchema({
    id: {
        in: 'params',
        isUUID: true,
        notEmpty: true,
        errorMessage: 'Product id is required',
    },
    title: {
        in: 'body',
        optional: true,
        isString: true,
        isLength: {
            options: {min: 3, max: 128},
            errorMessage: 'Title must be between 3 and 128 characters long'
        },
    },
    description: {
        in: 'body',
        optional: true,
        isString: true,
        errorMessage: 'Description is required',
    },
    price: {
        in: 'body',
        optional: true,
        isInt: {
            options: {min: 1, max: Infinity},
            errorMessage: 'Price must be a positive integer'
        },
        toInt: true,
        errorMessage: 'Price is required',
    },
    category_id: {
        in: 'body',
        optional: true,
        isUUID: true,
        errorMessage: 'Category id is required',
    }
})

export var validateAddToBasketFields = () => checkSchema({
    id: {
        in: 'params',
        notEmpty: true,
        isUUID: true,
        errorMessage: 'Product id is required',
    },
    q: {
        in: 'query',
        notEmpty: true,
        isInt: true,
        toInt: true,
        isLength: {options: {min: 1, max: Infinity}, errorMessage: 'Quantity must be a positive integer'},
        errorMessage: 'Quantity is required',
    }
})