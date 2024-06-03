import {eq} from 'drizzle-orm';
import {Repo} from '../../../core/repo';
import {db} from '../../../infra/database/drizzle';
import {redisService} from '../../../services';
import {User} from '../domain/user';
import {userTable} from '../infra/database/userTable';
import {userMapper} from '../mapper/userMapper';

export class UserRepo extends Repo<User> {
    constructor() {
        super(userTable, db, userMapper, redisService);
    }

    selectByEmail(email: string) {
        return this.selectOne(eq(userTable.email, email));
    }
}

export const userRepo = new UserRepo();
