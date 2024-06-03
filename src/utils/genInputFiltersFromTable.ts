import {MySqlColumn, MySqlTable} from "drizzle-orm/mysql-core";
import {forEach} from "./iterators";
import {GraphQLBoolean, GraphQLString} from "graphql";
import {newField, newFieldList, newInputField} from "../infra/graphql/factories/field";
import {StringUtils} from "./stringUtils";
import {dateScalar} from "../infra/graphql/scalars/date";
import {GraphQLInputObjectType, GraphQLInt} from "graphql/type";
import {newNonNull} from "../infra/graphql/factories/nonNull";
import {Fields} from "../core/resolver";

type ColumnTypes = 'MySqlInt' | 'MySqlVarChar' | 'MySqlDateTime'

const likeFilters = {
    like: newField(GraphQLString),
    notLike: newField(GraphQLString),
    ilike: newField(GraphQLString),
    notIlike: newField(GraphQLString)
}

const nullFilters = {
    isNull: newField(GraphQLBoolean),
    isNotNull: newField(GraphQLBoolean)
}

function newGraphQlFilterObject(objectName: string, colProps: MySqlColumn) {
    let fields = {}

    switch (colProps.columnType as ColumnTypes) {
        case "MySqlInt":
            fields = {
                eq: newField(GraphQLInt),
                gt: newField(GraphQLInt),
                gte: newField(GraphQLInt),
                lt: newField(GraphQLInt),
                lte: newField(GraphQLInt),
                inArray: newFieldList(newNonNull(GraphQLInt)),
                notInArray: newFieldList(newNonNull(GraphQLInt)),
                ...likeFilters,
                ...nullFilters
            }
            break

        case "MySqlVarChar":
            fields = {
                eq: newField(GraphQLString),
                gt: newField(GraphQLString),
                gte: newField(GraphQLString),
                lt: newField(GraphQLString),
                lte: newField(GraphQLString),
                inArray: newFieldList(newNonNull(GraphQLString)),
                notInArray: newFieldList(newNonNull(GraphQLString)),
                ...likeFilters,
                ...nullFilters
            }
            break

        case "MySqlDateTime":
            fields = {
                eq: newField(dateScalar),
                gt: newField(dateScalar),
                gte: newField(dateScalar),
                lt: newField(dateScalar),
                lte: newField(dateScalar),
                inArray: newFieldList(newNonNull(dateScalar)),
                notInArray: newFieldList(newNonNull(dateScalar)),
                ...likeFilters,
                ...nullFilters
            }
            break

        default:
            throw new Error(`Unknown column type ${colProps.columnType} from ${objectName}`)
    }

    return new GraphQLInputObjectType({
        name: `${objectName}${StringUtils.capitalize(colProps.name)}Filters`,
        fields
    })
}

export function genInputFiltersFromTable(objectName: string, table: MySqlTable) {
    const cols = Object.keys(table)

    let filters: Fields = {}

    forEach(cols, (col) => {
        filters[col] = newField(newGraphQlFilterObject(objectName, (table as any)[col]))
    })

    return newInputField(
        `${objectName}Filters`,
        `Filters for ${objectName} object`,
        filters
    )
}