import {buildSchema} from 'drizzle-graphql';
import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {db} from '../database/drizzle';
import {router} from '../../modules/shared/infra/router/router';

const {entities} = buildSchema(db);

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            ...entities.queries,
            ...router(),
        },
    }),
    types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});
