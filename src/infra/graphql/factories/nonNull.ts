import {GraphQLNonNull} from 'graphql';
import {GraphQLNullableType} from 'graphql/type/definition';

export function newNonNull<T extends GraphQLNullableType>(type: T): GraphQLNonNull<T> {
    return new GraphQLNonNull(type);
}
