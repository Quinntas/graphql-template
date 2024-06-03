import {GraphQLString} from 'graphql';
import {GraphQLInt} from 'graphql/type';
import {newNonNullField} from '../../../../infra/graphql/factories/field';
import {User} from '../../domain/user';

export interface PublicLoginToken {
    user: {
        pid: string;
    };
}

export interface PrivateLoginToken {
    user: User;
}

export const userLoginInputFields = {
    email: newNonNullField(GraphQLString),
    password: newNonNullField(GraphQLString),
};

export const userLoginOutputFields = {
    token: newNonNullField(GraphQLString),
    expiresIn: newNonNullField(GraphQLInt),
    expireDate: newNonNullField(GraphQLInt),
};
