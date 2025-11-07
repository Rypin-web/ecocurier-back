import {NextFunction, Request, Response} from "express";
import {extractTokenFromHeader} from "@utils/extractTokenFromHeader";
import {ApiErrors} from "@utils/ApiErrors";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_INFO} from "@config/server";

export type SessionClaims = {
    id: string,
    role: 'user' | 'admin' | 'courier'
} & JwtPayload
export type RequestWithUser = Request & { user?: SessionClaims };

export const requireRole = (requiredRole?: 'user' | 'admin' | 'courier') =>
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const token = extractTokenFromHeader(req);
            if (!token) throw ApiErrors.invalidCredentials("Unauthorized");

            const decoded = jwt.verify(token, JWT_INFO.SECRET_KEY_SESSION) as SessionClaims
            if (!decoded) throw ApiErrors.requireAdministrator('Unauthorized')
            if (requiredRole && decoded.role !== requiredRole) throw ApiErrors.requireAdministrator('Unauthorized')

            req.user = decoded
            return next()
        } catch (e) {
            next(e)
        }
    }