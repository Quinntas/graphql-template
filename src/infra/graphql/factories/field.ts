import {GraphQLObjectType} from 'graphql';
import {GraphQLScalarType} from 'graphql/type';
import {GraphQLMaybeScalar} from '../../../core/resolver';
import {newNonNull} from './nonNull';
import {newNonNullList} from "./list";

export function newField(type: GraphQLMaybeScalar | GraphQLObjectType) {
    return {
        type,
    };
}

export function newFieldList(type: GraphQLScalarType | GraphQLObjectType) {
    return newField(newNonNullList(type));
}

export function newNonNullField(type: GraphQLScalarType | GraphQLObjectType) {
    return newField(newNonNull(type));
}

export function newNonNullFieldList(type: GraphQLScalarType | GraphQLObjectType) {
    return newField(newNonNullList(type));
}