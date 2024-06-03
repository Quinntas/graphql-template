import {GraphQLMaybeScalar} from '../../../core/resolver';
import {newNonNullList} from './list';
import {newNonNull} from './nonNull';

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
