import {NextFunction, Request, Response} from "express";
import {User} from "@models/User";
import {ApiErrors} from "@utils/ApiErrors";
import bcrypt from 'bcrypt';
import {SALT} from "@config/server";
import {sequelize} from "@config/database";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await sequelize.transaction(async (t) => {
            const hasUser = await User.findOne({
                where: {email: req.body.email},
                transaction: t
            });
            if (hasUser) throw ApiErrors.userAlreadyCreated('User already created');

            const passwordHash = await bcrypt.hash(req.body.password, SALT);
            const user = await User.create({
                role: 'user',
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                email: req.body.email,
                password: passwordHash
            }, {transaction: t});

            return user;
        });

        return res.status(201).send({
            msg: 'User created',
            data: {
                user: {
                    id: result.id,
                    role: result.role,
                    first_name: result.first_name,
                    last_name: result.last_name,
                    phone: result.phone,
                    email: result.email,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt
                }
            }
        });
    } catch (e) {
        next(e);
    }
}