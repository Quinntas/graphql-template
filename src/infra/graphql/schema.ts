import {buildSchema} from 'drizzle-graphql';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {db} from '../database/drizzle';
import {router} from '../../modules/shared/infra/router/router';

export const {entities} = buildSchema(db);

function genSchema() {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                ...router(),
            },
        }),
        types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
    });
}

export const schema = genSchema();
