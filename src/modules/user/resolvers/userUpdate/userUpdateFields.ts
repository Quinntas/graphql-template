import {GraphQLBoolean, GraphQLString} from 'graphql';
import {newField, newNonNullField} from '../../../../infra/graphql/factories/field';
import {userGraphQLRoleEnum} from '../../graphQLObject/userGraphQLObject';

export const userUpdateInputFields = {
    email: newField(GraphQLString),
    password: newField(GraphQLString),
    phone: newField(GraphQLString),
    role: newField(userGraphQLRoleEnum),
};

export const userUpdateOutputFields = {
    isSuccessful: newNonNullField(GraphQLBoolean),
};
