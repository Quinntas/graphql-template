import {buildSchema} from 'drizzle-graphql';
import {db} from './drizzle';
import {GraphQLObjectType, GraphQLSchema, parse, printSchema} from 'graphql';
import {createWriteStream} from 'fs';

const {entities} = buildSchema(db);

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: entities.queries,
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: entities.mutations,
    }),
    types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});

const schemaF = createWriteStream('schema.graphql');
schemaF.write(printSchema(schema));
