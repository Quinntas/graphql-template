import {newField, newNonNullFieldList} from '../../../../infra/graphql/factories/field';
import {userGraphQLObject, userGraphQLObjectName} from '../../graphQLObject/userGraphQLObject';
import {genInputFiltersFromTable} from "../../../../utils/genInputFiltersFromTable";
import {userTable} from "../../infra/database/userTable";

export const usersInputFields = {
    where: newField(genInputFiltersFromTable(userGraphQLObjectName, userTable))
};

export const usersOutputFields = {
    data: newNonNullFieldList(userGraphQLObject),
};
