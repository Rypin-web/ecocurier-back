import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {Session} from "@models/Session";
import {User} from "@models/User";
import jwt from "jsonwebtoken";
import {JWT_INFO} from "@config/server";
import {hashToken} from "@utils/hashToken";
import {Op} from "sequelize";

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refresh = req.cookies['refresh-token'] || ''
        if (!refresh) throw ApiErrors.invalidCredentials('Invalid token.')

        const decoded = jwt.verify(refresh, JWT_INFO.SECRET_KEY_REFRESH) as { id: string }
        if (!decoded) throw ApiErrors.invalidCredentials('Invalid token.')

        const session = await Session.findOne({
            where: {
                refreshToken: hashToken(refresh),
                userId: decoded.id,
                expiresAt: {[Op.gt]: Date.now()}
            }
        })
        if (!session) throw ApiErrors.invalidCredentials('Invalid token.')

        const user = await User.findByPk(decoded.id)
        if (!user) {
            res.clearCookie('refresh-token')
            await Session.destroy({where: {userId: decoded.id}})
            throw ApiErrors.invalidCredentials('Invalid token.')
        }
        await session.update({lastActivity: new Date(Date.now())})
        const sessionToken = jwt.sign(
            {id: user.id, role: user.role},
            JWT_INFO.SECRET_KEY_SESSION,
            {expiresIn: JWT_INFO.SESSION_EXPIRES_IN}
        )
        return res.status(200).send({
            msg: 'Success refresh',
            data: {
                sessionToken,
            }
        })
    } catch (e) {
        next(e)
    }
}