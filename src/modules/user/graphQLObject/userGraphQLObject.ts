import {GraphQLObjectType, GraphQLString} from 'graphql';
import {newEnumType} from '../../../infra/graphql/factories/enum';
import {newNonNullField} from '../../../infra/graphql/factories/field';
import {baseDomainGraphQLObject} from '../../shared/graphQLObject/baseDomainGraphQLObject';
import {UserRolesEnum} from '../domain/user';

export const userGraphQLRoleEnum = newEnumType('UserRolesEnum', UserRolesEnum);

export const userGraphQLObject = new GraphQLObjectType({
    name: 'User',
    description: 'User object',
    fields: {
        ...baseDomainGraphQLObject,
        email: newNonNullField(GraphQLString),
        password: newNonNullField(GraphQLString),
        phone: newNonNullField(GraphQLString),
        role: newNonNullField(userGraphQLRoleEnum),
    },
});
