import {GraphQLMaybeScalar} from "../../../core/resolver";
import {GraphQLList, GraphQLObjectType} from "graphql/index";
import {newNonNull} from "./nonNull";

export function newList(type: GraphQLMaybeScalar | GraphQLObjectType) {
    return new GraphQLList(type)
}

export function newNonNullList(type: GraphQLMaybeScalar | GraphQLObjectType) {
    return newNonNull(newList(type))
}