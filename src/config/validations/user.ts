import {checkSchema} from "express-validator";

export var validateRegisterFields = () => checkSchema({
    first_name: {
        notEmpty: {errorMessage: 'First name is required'},
        isLength: {
            options: {min: 3, max: 128},
            errorMessage: 'First name must be between 3 and 128 characters long'
        }
    },
    phone: {
        notEmpty: {errorMessage: 'phone is required'},
        isLength: {
            options: {min: 8, max: 32},
            errorMessage: 'phone must be between 3 and 32 characters long'
        },
        isMobilePhone: {
            options: ['ru-RU'],
            errorMessage: 'Invalid phone. Phone may be in ru-RU format'
        }
    },
    email: {
        errorMessage: 'Invalid email',
        notEmpty: {errorMessage: 'Email is required'},
        isEmail: true,
        isLength: {
            options: {min: 6, max: 128},
            errorMessage: 'Email must be between 6 and 128 characters long'
        }
    },
    password: {
        errorMessage: 'Invalid password',
        notEmpty: {errorMessage: 'Password is required'},
        isLength: {
            options: {min: 8, max: 32},
            errorMessage: 'Password must be between 8 and 32 characters long'
        }
    }
})