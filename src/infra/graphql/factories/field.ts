import {GraphQLObjectType} from 'graphql';
import {GraphQLInputObjectType} from 'graphql/type';
import {Fields, GraphQLMaybeScalar} from '../../../core/resolver';
import {newList, newNonNullList} from './list';
import {newNonNull} from './nonNull';

export function newField(type: GraphQLMaybeScalar) {
    return {
        type,
    };
}

export function newInputField(name: string, description: string, fields: Fields) {
    return new GraphQLInputObjectType({
        name,
        description,
        fields,
    });
}

export function newOutputFields(name: string, description: string, fields: Fields) {
    return new GraphQLObjectType({
        name,
        description,
        fields,
    });
}

export function newFieldList(type: GraphQLMaybeScalar) {
    return newField(newList(type));
}

export function newNonNullField(type: GraphQLMaybeScalar) {
    return newField(newNonNull(type));
}

export function newNonNullFieldList(type: GraphQLMaybeScalar) {
    return newField(newNonNullList(type));
}
