import {newField, newNonNullFieldList} from '../../../../infra/graphql/factories/field';
import {paginationInputObject, paginationOutputObject} from '../../../../infra/graphql/pagination/graphqlPagination';
import {genInputFiltersFromTable} from '../../../../utils/genInputFiltersFromTable';
import {userGraphQLObject, userGraphQLObjectName} from '../../graphQLObject/userGraphQLObject';
import {userTable} from '../../infra/database/userTable';

export const usersInputFields = {
    where: newField(genInputFiltersFromTable(userGraphQLObjectName, userTable)),
    pagination: newField(paginationInputObject),
};

export const usersOutputFields = {
    data: newNonNullFieldList(userGraphQLObject),
    pagination: newField(paginationOutputObject),
};
