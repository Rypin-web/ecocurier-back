import {Request} from "express";

export function extractTokenFromHeader(req: Request): string | null {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || typeof authHeader !== "string") return null;

    const parts = authHeader.split(" ");
    if (parts.length !== 2) return null;

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return null;

    return token || null;
}