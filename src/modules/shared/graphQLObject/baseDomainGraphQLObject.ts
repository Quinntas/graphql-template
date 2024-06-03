import {GraphQLString} from 'graphql';
import {GraphQLInt} from 'graphql/type';
import {newNonNullField} from '../../../infra/graphql/factories/field';
import {dateScalar} from '../../../infra/graphql/scalars/date';

export const baseDomainGraphQLObject = {
    id: newNonNullField(GraphQLInt),
    pid: newNonNullField(GraphQLString),
    createdAt: newNonNullField(dateScalar),
    updatedAt: newNonNullField(dateScalar),
};
