import {Context} from '../../../shared/domain/context';
import {User} from '../../domain/user';

export interface UserContext extends Context {
    user: User;
}
