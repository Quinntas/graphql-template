import {Router} from '../../../../core/types/router';
import {userCreateResolver} from '../../resolvers/userCreate';
import {userLoginResolver} from '../../resolvers/userLogin';
import {userMeResolver} from '../../resolvers/userMe';
import {userUpdateResolver} from '../../resolvers/userUpdate';
import {usersResolver} from '../../resolvers/users';
import {ensureAuthenticated} from '../middleware/ensureAuthenticated';

export const userRouter: Router = [
    {
        resolver: userLoginResolver,
        middleware: [],
    },
    {
        resolver: userMeResolver,
        middleware: [ensureAuthenticated],
    },
    {
        resolver: userCreateResolver,
        middleware: [],
    },
    {
        resolver: userUpdateResolver,
        middleware: [ensureAuthenticated],
    },
    {
        resolver: usersResolver,
        middleware: [ensureAuthenticated],
    },
];
