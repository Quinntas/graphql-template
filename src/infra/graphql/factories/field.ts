import {GraphQLObjectType} from 'graphql';
import {GraphQLScalarType} from 'graphql/type';
import {GraphQLMaybeScalar} from '../../../core/resolver';
import {newNonNull} from './nonNull';

export function newField(type: GraphQLMaybeScalar | GraphQLObjectType) {
    return {
        type,
    };
}

export function newNonNullField(type: GraphQLScalarType | GraphQLObjectType) {
    return newField(newNonNull(type));
}
