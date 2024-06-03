import {GraphQLInt} from 'graphql/type';
import {newEnumType} from '../factories/enum';
import {newInputField, newNonNullField, newOutputFields} from '../factories/field';
import {GraphQLBoolean} from "graphql";

export enum PaginationOrderByEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const GraphqlPaginationOrderByEnum = newEnumType('PaginationOrderByEnum', PaginationOrderByEnum);

export const paginationInputObject = newInputField('PaginationInput', '', {
    limit: newNonNullField(GraphQLInt),
    offset: newNonNullField(GraphQLInt),
    orderBy: newNonNullField(GraphqlPaginationOrderByEnum),
});

export const paginationOutputObject = newOutputFields('PaginationOutput', '', {
    nextOffset: newNonNullField(GraphQLInt),
    hasMore: newNonNullField(GraphQLBoolean),
    total: newNonNullField(GraphQLInt),
});
