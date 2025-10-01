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

export var validateLoginFields = () => checkSchema({
    email: {
        notEmpty: true,
        isEmail: {errorMessage: 'Invalid email'},
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'Email is too small or big'
        },
        errorMessage: 'Email is requires',
    },
    password: {
        notEmpty: true,
        isLength: {
            options: {min: 6, max: 32},
            errorMessage: 'Password is too small or big'
        },
        errorMessage: 'Password is required'
    }
})


export var validateQueryGetAllUsers = () => checkSchema({
    page: {
        notEmpty: {errorMessage: 'Page is required'},
        toInt: true,
        isInt: {options: {min: 1}, errorMessage: 'Page must be an integer'},
    },
    limit: {
        notEmpty: {errorMessage: 'Limit is required'},
        toInt: true,
        isInt: {options: {min: 1, max: 100}, errorMessage: 'Limit must be an integer'},
    }
}, ['query'])

export var validateUpdateMeFields = () => checkSchema({
    first_name: {
        optional: true,
        isLength: {
            options: {min: 3, max: 128},
            errorMessage: 'First name must be between 3 and 128 characters long'
        }
    },
    last_name: {
        optional: true,
        isLength: {
            options: {min: 3, max: 128},
            errorMessage: 'Last name must be between 3 and 128 characters long'
        }
    },
    email: {
        optional: true,
        isEmail: {errorMessage: 'Invalid email'},
        isLength: {
            options: {min: 6, max: 128},
            errorMessage: 'Email must be between 6 and 128 characters long'
        }
    },
    phone: {
        optional: true,
        isLength: {
            options: {min: 8, max: 32},
            errorMessage: 'Phone must be between 8 and 32 characters long'
        },
        isMobilePhone: {
            options: ['ru-RU'],
            errorMessage: 'Invalid phone. Phone may be in ru-RU format'
        }
    }
})