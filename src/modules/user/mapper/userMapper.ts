import {GraphQLError} from 'graphql/index';
import {Mapper} from '../../../core/mapper';
import {User} from '../domain/user';

export class UserMapper extends Mapper<User> {
    toPublicDomain(user: User): Partial<User> {
        return {
            pid: user.pid,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    toDomain(raw: any): Required<User> {
        if (!raw) throw new GraphQLError('Invalid input');
        if (raw.id === undefined) throw new GraphQLError('Invalid input');
        if (raw.pid === undefined) throw new GraphQLError('Invalid input');
        if (raw.name === undefined) throw new GraphQLError('Invalid input');
        if (raw.email === undefined) throw new GraphQLError('Invalid input');
        if (raw.password === undefined) throw new GraphQLError('Invalid input');
        if (raw.createdAt === undefined) throw new GraphQLError('Invalid input');
        if (raw.updatedAt === undefined) throw new GraphQLError('Invalid input');
        return raw as Required<User>;
    }
}

export const userMapper = new UserMapper();
