export {User} from "./user.model"
export {IUserDocument} from "./typing";
export {UserRouter} from "./user.router";
export {UserService} from "./user.service"

export enum PermissionList {
    ADD_USER = "ADD_USER",
    UPDATE_PERMISSIONS = "UPDATE_PERMISSIONS"
}
