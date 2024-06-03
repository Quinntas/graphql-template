import {GraphQLBoolean, GraphQLString} from 'graphql';
import {Fields} from '../../../../core/resolver';
import {newNonNullField} from '../../../../infra/graphql/factories/field';

export const userCreateInputFields: Fields = {
    email: newNonNullField(GraphQLString),
    password: newNonNullField(GraphQLString),
    phone: newNonNullField(GraphQLString),
};

export const userCreateOutputFields = {
    isSuccessful: newNonNullField(GraphQLBoolean),
};
