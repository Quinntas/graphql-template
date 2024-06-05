import {GraphQLResolveInfo} from 'graphql';
import {GraphQLError} from 'graphql/index';
import {HttpError} from '../../../../core/errors';
import {redisService} from '../../../../services';
import {JWT} from '../../../../utils/jsonWebToken';
import {Context} from '../../../shared/domain/context';
import {loginRedisKeyPrefix} from '../../resolvers/userLogin/userLoginConstants';
import {PrivateLoginToken, PublicLoginToken} from '../../resolvers/userLogin/userLoginFields';
import {UserContext} from '../context/userContext';

export async function ensureAuthenticated(
    _: null,
    __: null,
    context: Context,
    ___: GraphQLResolveInfo,
    next: (_: null, __: null, context: UserContext) => void,
) {
    const token = context.decodedRequest.authorization;

    if (!token) throw new GraphQLError('No token provided');

    const tokenValue = token.split(' ');

    if (tokenValue.length !== 2 || tokenValue[0] !== 'Bearer') throw new HttpError(401, 'Invalid token format');

    const publicDecoded: PublicLoginToken = JWT.decode<PublicLoginToken>(tokenValue[1]);

    if (!publicDecoded) throw new GraphQLError('Invalid token');

    const privateToken = await redisService.get(loginRedisKeyPrefix + publicDecoded.user.pid);

    if (!privateToken) throw new GraphQLError('Token not found');

    const privateDecoded: PrivateLoginToken = JWT.decode<PrivateLoginToken>(privateToken);

    return next(_, __, {
        ...context,
        user: privateDecoded.user,
    });
}
