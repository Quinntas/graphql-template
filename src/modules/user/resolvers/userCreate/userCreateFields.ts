import {newNonNullField} from "../../../../infra/graphql/factories/field";
import {Fields} from "../../../../core/resolver";
import {GraphQLString} from "graphql";
import {entities} from "../../../../infra/database/drizzle";

export const userCreateInputFields: Fields = {
    email: newNonNullField(GraphQLString),
    password: newNonNullField(GraphQLString),
    phone: newNonNullField(GraphQLString),
};

export const userCreateOutputFields = {
    result: newNonNullField(entities.types.MutationReturn),
};
