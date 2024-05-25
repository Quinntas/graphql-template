import {GraphQLMaybeScalar} from "../../../core/resolver";
import {newNonNull} from "./nonNull";
import {GraphQLScalarType} from "graphql/type";

export function newField(type: GraphQLMaybeScalar) {
    return {
        type,
    }
}

export function newNonNullField(type: GraphQLScalarType) {
    return newField(newNonNull(type));
}