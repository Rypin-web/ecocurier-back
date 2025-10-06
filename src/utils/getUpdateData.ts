import {Request} from "express";

export function getUpdateData (body:Request['body'], fields:string[]) {
    const updateData:any = {}
    fields.forEach((e)=>{
        if(body[e] !== undefined) updateData[e] = body[e]
    })
    return updateData
}