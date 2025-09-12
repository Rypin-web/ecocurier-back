export class ApiErrors extends Error {
    public readonly msg: string
    public  readonly status: number
    public  readonly  errors: object | null

    constructor(statusCode:number = 500, message?:string, errors?:object) {
        super(message)
        this.msg = message || 'Unknown error'
        this.status = statusCode
        this.errors = errors || null
    }

    static validationFields (msg?:string, errors?:object,) {
        return new ApiErrors(400, msg, errors)
    }

    static userAlreadyCreated (msg?:string, errors?:object,) {
        return new ApiErrors(409, msg, errors)
    }
}

export type ApiErrorsType = {
    status: number,
    msg: string,
    errors: object | null
}