import {Router} from '../../../../core/types/router';
import {userLoginResolver} from '../../resolvers/userLogin';
import {userMeResolver} from '../../resolvers/userMe';
import {userCreateResolver} from "../../resolvers/userCreate";

export const userRouter: Router = [
    userLoginResolver,
    userMeResolver,
    userCreateResolver
];
