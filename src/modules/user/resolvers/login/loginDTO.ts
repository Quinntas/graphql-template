import {GraphQLNonNull, GraphQLString} from 'graphql';

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginOutput {
    token: string;
}

export const loginInputFields = {
    email: {
        type: new GraphQLNonNull(GraphQLString),
    },
    password: {
        type: new GraphQLNonNull(GraphQLString),
    },
};

export const loginOutputFields = {
    token: {
        type: new GraphQLNonNull(GraphQLString),
    },
};
