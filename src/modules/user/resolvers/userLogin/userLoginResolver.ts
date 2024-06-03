import {GraphQLError} from 'graphql/index';
import {DTO, Resolver} from '../../../../core/resolver';
import {redisService} from '../../../../services';
import {Encryption} from '../../../../utils/encryption';
import {env} from '../../../../utils/env';
import {JWT} from '../../../../utils/jsonWebToken';
import {validateUserEmail} from '../../domain/valueObjects/userEmail';
import {validateUserPassword} from '../../domain/valueObjects/userPassword';
import {userRepo} from '../../repo/userRepo';
import {loginRedisKeyPrefix, loginTokenExpiration} from './userLoginConstants';
import {PrivateLoginToken, PublicLoginToken, userLoginInputFields, userLoginOutputFields} from './userLoginFields';

export class UserLoginResolver extends Resolver<typeof userLoginInputFields, typeof userLoginOutputFields> {
    constructor() {
        super({
            name: 'userLogin',
            description: 'Login a user',
            route: 'mutation',
            fields: {
                input: userLoginInputFields,
                output: userLoginOutputFields,
            },
        });
    }

    async resolverFn(_: null, input: DTO<typeof userLoginInputFields>) {
        const email = validateUserEmail(input.email);
        const password = validateUserPassword(input.password);

        const result = await userRepo.selectByEmail(email);

        if (!result) throw new GraphQLError('User not found');

        const parsedPassword = Encryption.parseEncryptedString(result.password);

        if (!Encryption.compare(Encryption.encrypt(password, env.PEPPER, parsedPassword.iterations, parsedPassword.salt), result.password))
            throw new GraphQLError('Invalid email or password');

        const expireDate = Math.floor(Date.now() / 1000) + loginTokenExpiration;

        const publicTokenObject: PublicLoginToken = {
            user: {
                pid: result.pid,
            },
        };
        const publicToken: string = JWT.sign(publicTokenObject, {
            expiresIn: expireDate,
        });

        const privateTokenObject: PrivateLoginToken = {
            user: result,
        };

        const privateToken: string = JWT.sign(privateTokenObject, {
            expiresIn: expireDate,
        });

        await redisService.set(loginRedisKeyPrefix + result.pid, privateToken, loginTokenExpiration);

        return {
            token: publicToken,
            expiresIn: loginTokenExpiration,
            expireDate,
        };
    }
}
