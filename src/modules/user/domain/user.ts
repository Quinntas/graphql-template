import {Domain} from '../../../core/domain';

export enum UserRolesEnum {
    CLIENT = 'CLIENT',
    ADMIN = 'ADMIN',
}

export interface User extends Domain {
    email: string;
    password: string;
    phone: string;
    role: UserRolesEnum;
}
