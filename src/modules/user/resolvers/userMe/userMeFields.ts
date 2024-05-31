import {newField} from "../../../../infra/graphql/factories/field";
import {entities} from "../../../../infra/database/drizzle";

export const userMeInputFields = {};

export const userMeOutputFields = {
    //@ts-ignore
    data: newField(entities.types['UsersTableSelectItem'])
};
