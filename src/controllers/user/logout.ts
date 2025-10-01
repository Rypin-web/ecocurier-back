import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {NextFunction, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {Session} from "@models/Session";
import {checkFingerprint} from "@utils/fingerprint";

export async function logout(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies['refresh-token'] || ''
        const userId = req.user?.sep || ''
        if (!refreshToken || !userId) throw ApiErrors.invalidCredentials('Invalid token.')
        const session = await Session.findOne({where: {refreshToken: refreshToken, userId: userId}})
        if(!session) throw ApiErrors.invalidCredentials('Logout failed')
        if(!await checkFingerprint(req, session.fingerprint)) throw ApiErrors.invalidCredentials('Invalid fingerprint')
        await session.destroy()
        res.clearCookie('refresh-token')
        return res.status(200).send({
            msg:'Success logout'
        })
    } catch (e) {
        next(e)
    }
}