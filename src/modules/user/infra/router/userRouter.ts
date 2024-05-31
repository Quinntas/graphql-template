import {Router} from '../../../../core/types/router';
import {userLoginResolver} from '../../resolvers/userLogin';
import {userMeResolver} from "../../resolvers/userMe";

export const userRouter: Router = [userLoginResolver, userMeResolver];
