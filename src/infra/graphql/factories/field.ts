import {GraphQLMaybeScalar} from '../../../core/resolver';
import {newNonNull} from './nonNull';
import {newNonNullList} from "./list";

export function newField(type: GraphQLMaybeScalar) {
    return {
        type,
    };
}

export function newFieldList(type: GraphQLMaybeScalar) {
    return newField(newNonNullList(type));
}

export function newNonNullField(type: GraphQLMaybeScalar) {
    return newField(newNonNull(type));
}

export function newNonNullFieldList(type: GraphQLMaybeScalar) {
    return newField(newNonNullList(type));
}