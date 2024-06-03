import {newInputField, newNonNullField, newOutputFields} from "../factories/field";
import {GraphQLInt} from "graphql/type";
import {newEnumType} from "../factories/enum";

export enum PaginationOrderByEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}

export const GraphqlPaginationOrderByEnum = newEnumType('PaginationOrderByEnum', PaginationOrderByEnum)

export const GraphqlPaginationInputObject = newInputField(
    'Pagination Input',
    '',
    {
        limit: newNonNullField(GraphQLInt),
        offset: newNonNullField(GraphQLInt),
        orderBy: newNonNullField(GraphqlPaginationOrderByEnum),
    }
)

export const GraphqlPaginationOutputObject = newOutputFields(
    'Pagination Output',
    '',
    {
        nextOffset: newNonNullField(GraphQLInt),
        hasMore: newNonNullField(GraphQLInt),
        total: newNonNullField(GraphQLInt),
    }
)