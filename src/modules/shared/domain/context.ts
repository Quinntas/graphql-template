import {User} from '../../user/domain/user';

export interface Context {
    bearer: string;
    user: User;
}
