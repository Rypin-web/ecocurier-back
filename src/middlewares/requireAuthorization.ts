import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_INFO} from "@config/server";
import {ApiErrors} from "@utils/ApiErrors";
import {extractTokenFromHeader} from "@utils/extractTokenFromHeader";

export type SessionClaims = {
    sep: string,
    role: 'user' | 'admin'
} & JwtPayload
export type RequestWithUser = Request & { user?: SessionClaims };

export function requireAuthorization(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const token = extractTokenFromHeader(req);
        if (!token) {
            throw ApiErrors.invalidCredentials("Unauthorized: token is missing or has invalid format");
        }

        try {
            const decoded = jwt.verify(token, JWT_INFO.SECRET_KEY_SESSION) as SessionClaims;
            req.user = decoded;
            return next();
        } catch (err: any) {
            const message = err?.name === "TokenExpiredError"
                ? "Unauthorized: token expired"
                : "Unauthorized: invalid token";
            throw ApiErrors.invalidCredentials(message, err);
        }
    } catch (e) {
        next(e);
    }
}