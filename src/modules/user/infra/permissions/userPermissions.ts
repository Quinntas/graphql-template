import {RBAC} from '../../../../core/rbac';
import {UserRolesEnum} from '../../domain/user';
import {userTable} from '../database/userTable';

export const userPermissions: RBAC<typeof userTable> = {
    [UserRolesEnum.ADMIN]: new Map([
        ['id', {view: true, edit: true}],
        ['pid', {view: true, edit: true}],
        ['email', {view: true, edit: true}],
        ['password', {view: true, edit: true}],
        ['phone', {view: true, edit: true}],
        ['role', {view: true, edit: true}],
        ['createdAt', {view: true, edit: true}],
        ['updatedAt', {view: true, edit: true}],
    ]),
    [UserRolesEnum.CLIENT]: new Map([
        ['id', {view: false, edit: false}],
        ['pid', {view: true, edit: false}],
        ['email', {view: true, edit: true}],
        ['password', {view: false, edit: true}],
        ['phone', {view: true, edit: true}],
        ['role', {view: true, edit: false}],
        ['createdAt', {view: true, edit: false}],
        ['updatedAt', {view: true, edit: false}],
    ]),
};
