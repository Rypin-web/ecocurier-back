import {checkSchema} from "express-validator";

export const validateGetOrdersFields = () => checkSchema({
    limit: {
        optional: true,
        isInt: {
            options: { min: 1, max: 100 },
            errorMessage: 'Limit must be an integer between 1 and 100'
        },
        toInt: true
    },
    page: {
        optional: true,
        isInt: {
            options: { min: 1 },
            errorMessage: 'Page number must be an integer greater than 0'
        },
        toInt: true
    },
    status: {
        optional: true,
        isString: {
            errorMessage: 'Status must be a string'
        },
        trim: true
    },
    order: {
        optional: true,
        isIn: {
            options: [['ASC', 'DESC']],
            errorMessage: 'Order must be either ASC or DESC'
        },
    }
});