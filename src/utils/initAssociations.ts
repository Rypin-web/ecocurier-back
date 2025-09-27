import {Session} from "@models/Session";
import {User} from "@models/User";

export function initAssociations () {
    User.hasMany(Session, {foreignKey: 'user_id'})
    Session.belongsTo(User, {foreignKey: 'user_id'})
}