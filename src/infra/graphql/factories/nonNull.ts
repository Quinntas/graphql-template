import {GraphQLNullableType} from "graphql/type/definition";
import {GraphQLNonNull} from "graphql";

export function newNonNull<T extends GraphQLNullableType>(type: T) {
    return new GraphQLNonNull(type);
}