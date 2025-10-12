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
