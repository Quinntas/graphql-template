import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {MainRouter} from '../router/router';

// TODO: when develop create schema, when prod use the schema.graphql file

function genSchema() {
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: {
                ...MainRouter.getQueries(),
            },
        }),
        mutation: new GraphQLObjectType({
            name: 'Mutation',
            fields: {
                ...MainRouter.getMutations(),
            },
        }),
    });
}


export const schema = genSchema();
