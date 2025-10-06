import {NextFunction, Response} from "express";
import {validationResult} from "express-validator";
import {ApiErrors} from "@utils/ApiErrors";
import {RequestWithUser} from "@/middlewares/requireAuthorization";
import {User} from "@models/User";
import {getUpdateData} from "@utils/getUpdateData";

export async function updateMe(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const userId = req.user?.sep;
            if (!userId) {
                throw ApiErrors.invalidCredentials('User not authenticated');
            }

            const user = await User.findByPk(userId);
            if (!user) {
                throw ApiErrors.userNotFound('User not found');
            }

            const updateData: any = getUpdateData(req.body, ['first_name', 'last_name', 'email', 'phone']);
            await user.update(updateData);
            return res.status(200).send({
                msg: 'User updated successfully',
                data: {
                    user: {
                        ...user.dataValues,
                        password: undefined
                    },
                    updatedData: {
                        ...updateData
                    }
                }
            });
        }
        throw ApiErrors.validationFields('Invalid data', result.array());

    } catch (e) {
        next(e);
    }
}
