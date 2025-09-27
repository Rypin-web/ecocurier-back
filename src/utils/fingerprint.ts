import {Request} from "express";
import bcrypt from "bcrypt";
import {SALT} from "@config/server";

export async function createFingerprint(req: Request) {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip;
    const acceptLanguage = req.headers['accept-language'] || ''

    const raw = `fingerprint: ${userAgent}@${ip}@${acceptLanguage}`
    return await bcrypt.hash(raw, SALT)
}

export async function checkFingerprint(req: Request, fingerprint: string) {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.ip;
    const acceptLanguage = req.headers['accept-language'] || '';

    const raw = `fingerprint: ${userAgent}@${ip}@${acceptLanguage}`
    return await bcrypt.compare(raw, fingerprint)
}