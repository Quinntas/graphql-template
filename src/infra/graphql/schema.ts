import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {entities} from '../database/drizzle';
import {MainRouter} from '../router/router';

function genSchema() {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                ...MainRouter.getQueries(),
            },
        }),
        types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                ...MainRouter.getMutations(),
            },
        }),
    });
}

export const schema = genSchema();
