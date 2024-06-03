import {newNonNullField} from '../../../../infra/graphql/factories/field';
import {userGraphQLObject} from '../../graphQLObject/userGraphQLObject';

export const userMeInputFields = {};

export const userMeOutputFields = {
    data: newNonNullField(userGraphQLObject),
};
