import {Router} from '../../../../core/types/router';
import {userCreateResolver} from '../../resolvers/userCreate';
import {userLoginResolver} from '../../resolvers/userLogin';
import {userMeResolver} from '../../resolvers/userMe';
import {userUpdateResolver} from '../../resolvers/userUpdate';
import {usersResolver} from "../../resolvers/users";

export const userRouter: Router = {
    resolvers: [userLoginResolver, userMeResolver, userCreateResolver, userUpdateResolver, usersResolver],
};
