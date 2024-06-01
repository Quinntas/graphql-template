import {GraphQLString} from 'graphql';
import {newNonNullField} from '../../../../infra/graphql/factories/field';

export const userLoginInputFields = {
    email: newNonNullField(GraphQLString),
    password: newNonNullField(GraphQLString),
};

export const userLoginOutputFields = {
    token: newNonNullField(GraphQLString),
};
