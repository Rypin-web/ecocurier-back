import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {JWT_INFO} from "@config/server";
import {createFingerprint} from "@utils/fingerprint";
import {Session} from "@models/Session";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req)
        if (result.isEmpty()) {
            const user = await User.findOne({where: {email: req.body.email}})
            if (!user) throw ApiErrors.userNotFound('User not found')
            const isPasswordValid = await bcrypt.compare(req.body.password, user.dataValues.password)
            if (!isPasswordValid) throw ApiErrors.invalidCredentials('Invalid credentials')
            const fingerprint = await createFingerprint(req)

            const sessionToken = jwt.sign(
                {sep:user.id, role:user.role},
                JWT_INFO.SECRET_KEY_SESSION,
                {expiresIn: JWT_INFO.SESSION_EXPIRES_IN}
            )
            const refreshToken = jwt.sign(
                {...user.dataValues, password:undefined},
                JWT_INFO.SECRET_KEY_REFRESH,
                {expiresIn: JWT_INFO.REFRESH_EXPIRES_IN}
            )
            await Session.create({
                userId: user.id,
                refreshToken: refreshToken,
                fingerprint: fingerprint
            })

            return res.status(200).send({
                msg: 'Success login. Hello ' + user.dataValues.first_name,
                data: {
                    user: {...user.dataValues, password: undefined},
                    sessionToken,
                    refreshToken
                }
            })
        }

        throw ApiErrors.validationFields('Invalid data', result.array())
    } catch (e) {
        next(e)
    }
}