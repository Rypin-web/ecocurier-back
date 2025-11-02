import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {JWT_INFO} from "@config/server";
import {Session} from "@models/Session";
import {hashToken} from "@utils/hashToken";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findOne({where: {email: req.body.email}})
        if (!user) throw ApiErrors.NotFound('User not found')
        const isPasswordValid = await bcrypt.compare(req.body.password, user.dataValues.password)
        if (!isPasswordValid) throw ApiErrors.invalidCredentials('Invalid data')

        const sessionToken = jwt.sign(
            {id: user.id, role: user.role},
            JWT_INFO.SECRET_KEY_SESSION,
            {expiresIn: JWT_INFO.SESSION_EXPIRES_IN}
        )
        const refreshToken = jwt.sign(
            {id: user.id},
            JWT_INFO.SECRET_KEY_REFRESH,
            {expiresIn: JWT_INFO.REFRESH_EXPIRES_IN}
        )
        await Session.create({
            userId: user.id,
            refreshToken: hashToken(refreshToken),
            expiresAt: new Date(Date.now() + JWT_INFO.REFRESH_EXPIRES_IN),
        })
        res.cookie('refresh-token', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: JWT_INFO.REFRESH_EXPIRES_IN,
        })
        return res.status(200).send({
            msg: 'Success login',
            data: {
                user: {...user.dataValues, password: undefined},
                sessionToken,
            }
        })
    } catch (e) {
        next(e)
    }
}