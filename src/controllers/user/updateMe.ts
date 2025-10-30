import {NextFunction, Response} from "express";
import {ApiErrors} from "@utils/ApiErrors";
import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {User} from "@models/User";
import {getUpdateData} from "@utils/getUpdateData";

export async function updateMe(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.sep;
        if (!userId) {
            throw ApiErrors.invalidCredentials('User not authenticated');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw ApiErrors.NotFound('User not found');
        }

        const payload = getUpdateData<User>(req.body, ['first_name', 'last_name', 'email', 'phone']);
        await user.update(payload);
        return res.status(200).send({
            msg: 'User updated successfully',
            data: {
                user: {
                    ...user.dataValues,
                    password: undefined
                },
                updatedData: {
                    ...payload
                }
            }
        });
    } catch (e) {
        next(e);
    }
}
