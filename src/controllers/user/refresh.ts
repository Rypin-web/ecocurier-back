import {NextFunction, Request, Response} from "express";
import {checkFingerprint} from "@utils/fingerprint";
import {ApiErrors} from "@utils/ApiErrors";
import {Session} from "@models/Session";
import {User} from "@models/User";
import jwt from "jsonwebtoken";
import {JWT_INFO} from "@config/server";

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies['refresh-token'] || ''
        if (!refreshToken) throw ApiErrors.invalidCredentials('Invalid refresh or fingerprint. Try to login again')

        const session = await Session.findOne({where: {refreshToken: refreshToken}})
        if (!session) throw ApiErrors.invalidCredentials('Invalid refresh or fingerprint. Try to login again')
        const isFpValid = await checkFingerprint(req, session.fingerprint)
        if (!isFpValid) {
            await session.destroy()
            throw ApiErrors.invalidCredentials('Invalid refresh or fingerprint. Try to login again')
        }
        const user = await User.findByPk(session.userId)
        if (!user) throw ApiErrors.NotFound('User not found')
        try {
            const refreshResult = jwt.verify(refreshToken, JWT_INFO.SECRET_KEY_REFRESH)
            const sessionToken = jwt.sign(
                {sep: user.id, role: user.role},
                JWT_INFO.SECRET_KEY_SESSION,
                {expiresIn: JWT_INFO.SESSION_EXPIRES_IN}
            )
            const newRefreshToken = jwt.sign({
                ...user.dataValues,
                password: undefined
            }, JWT_INFO.SECRET_KEY_REFRESH, {expiresIn: JWT_INFO.REFRESH_EXPIRES_IN})
            await session.update({refreshToken: newRefreshToken})
            res.cookie('refresh-token', newRefreshToken, {httpOnly: true})
            return res.status(200).send({
                msg: 'Success refresh',
                data: {
                    sessionToken
                }
            })
        } catch (err) {
            await session.destroy()
            throw ApiErrors.invalidCredentials('Invalid refresh token')
        }

    } catch (e) {
        next(e)
    }
}