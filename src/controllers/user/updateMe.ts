import {NextFunction, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {User} from "@models/User";
import {extractBodyData} from "@utils/extractBodyData";
import {RequestWithUser} from "@/middlewares/requireRole";
import {sequelize} from "@config/database";

export async function updateMe(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = await sequelize.transaction(async (t) => {
            const userId = req.user?.id;
            if (!userId) {
                throw ApiErrors.invalidCredentials('User not authenticated');
            }
            const user = await User.findByPk(userId, {transaction: t});
            if (!user) {
                throw ApiErrors.NotFound('User not found');
            }

            const payload = extractBodyData<User>(req.body, ['first_name', 'last_name', 'email', 'phone']);
            await user.update(payload, {transaction: t});

            return {user, payload};
        });

        return res.status(200).send({
            msg: 'User updated successfully',
            data: {
                user: {
                    id: result.user.id,
                    first_name: result.user.first_name,
                    last_name: result.user.last_name,
                    email: result.user.email,
                    phone: result.user.phone,
                    role: result.user.role,
                    createdAt: result.user.createdAt,
                    updatedAt: result.user.updatedAt
                },
                updatedData: result.payload
            }
        });
    } catch (e) {
        next(e);
    }
}
