import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';

/*
 * Hope no one ever uses this
 * */

export const anyScalar = new GraphQLScalarType({
    name: 'Any',
    description: 'Any custom scalar type',
    serialize(value: any) {
        switch (typeof value) {
            case 'string':
            case 'number':
            case 'object':
            case 'boolean':
                return value;
            default:
                throw new Error(`GraphQL Any Scalar serializer cannot handle the ${typeof value} type`);
        }
    },
    parseValue(value: any) {
        switch (typeof value) {
            case 'string':
            case 'number':
            case 'object':
            case 'boolean':
                return value;
            default:
                throw new Error(`GraphQL Any Scalar serializer cannot handle the ${typeof value} type`);
        }
    },
    // @ts-ignore
    parseLiteral(ast) {
        switch (ast.kind) {
            case Kind.OBJECT:
            case Kind.LIST:
            case Kind.STRING:
            case Kind.INT:
            case Kind.BOOLEAN:
            case Kind.FLOAT:
                return ast;
            default:
                return null;
        }
    },
});
