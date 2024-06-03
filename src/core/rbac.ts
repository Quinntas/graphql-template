import {MySqlTable} from 'drizzle-orm/mysql-core';
import {UserRolesEnum} from '../modules/user/domain/user';

type MySqlTableColumns<T> = T extends MySqlTable ? keyof T['$inferSelect'] : never;

export type RBAC<T extends MySqlTable> = {
    [key in UserRolesEnum]: Map<
        MySqlTableColumns<T>,
        {
            view: boolean;
            edit: boolean;
        }
    >;
};

export function hasViewPermission<T extends MySqlTable>(role: UserRolesEnum, field: MySqlTableColumns<T>, rbac: RBAC<T>): boolean {
    return rbac[role].get(field)?.view ?? false;
}

export function hasEditPermission<T extends MySqlTable>(role: UserRolesEnum, field: MySqlTableColumns<T>, rbac: RBAC<T>): boolean {
    return rbac[role].get(field)?.edit ?? false;
}
