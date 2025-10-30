import {Request} from "express";

export function getUpdateData<T extends Record<string, any>>(body: Request['body'], fields: (keyof T)[]): Partial<T> {
    const updateData: Partial<T> = {}
    fields.forEach((e) => {
        if (body[e] !== undefined) updateData[e] = body[e]
    })
    return updateData
}