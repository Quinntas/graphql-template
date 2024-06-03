import {GraphQLList} from 'graphql/index';
import {GraphQLMaybeScalar} from '../../../core/resolver';
import {newNonNull} from './nonNull';

export function newList(type: GraphQLMaybeScalar) {
    return new GraphQLList(type);
}

export function newNonNullList(type: GraphQLMaybeScalar) {
    return newNonNull(newList(type));
}
