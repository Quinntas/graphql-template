import {entities} from '../../../../infra/database/drizzle';
import {newNonNullField} from '../../../../infra/graphql/factories/field';

export const userMeInputFields = {};

export const userMeOutputFields = {
    data: newNonNullField(entities.types.UsersSelectItem),
};
