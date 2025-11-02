import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {Session} from "@models/Session";
import {hashToken} from "@utils/hashToken";
import {Op} from "sequelize";

export async function logout(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies['refresh-token'] || ''
        const userId = req.user?.id || ''
        if (!refreshToken || !userId) throw ApiErrors.invalidCredentials('Invalid data.')
        const session = await Session.findOne({
            where: {
                refreshToken: hashToken(refreshToken),
                userId: userId,
                expiresAt: {[Op.gt]: Date.now()}
            }
        })
        if(!session) throw ApiErrors.invalidCredentials('Invalid data.')
        await session.destroy()
        res.clearCookie('refresh-token')
        return res.status(200).send({
            msg: 'Success logout'
        })
    } catch (e) {
        next(e)
    }
}