import {
    GraphQLFieldConfig,
    GraphQLInputFieldConfig,
    GraphQLInputType,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLOutputType,
    GraphQLResolveInfo,
    ThunkObjMap,
} from 'graphql';
import {GraphQLScalarType} from 'graphql/type';
import {Context} from '../modules/shared/domain/context';
import {MiddlewareFn} from './types/middleware';

export type ArrayOfResolvers = Resolver<any, any>[];

type GraphQLRoute = 'query' | 'mutation';

type GraphQLString<T> =
    T extends GraphQLNonNull<GraphQLScalarType<string, string>> ? string : T extends GraphQLScalarType<string, string> ? string | null : never;
type GraphQLNumber<T> =
    T extends GraphQLNonNull<GraphQLScalarType<number, number>> ? number : T extends GraphQLScalarType<number, number> ? number | null : never;
type GraphQLBoolean<T> =
    T extends GraphQLNonNull<GraphQLScalarType<boolean, boolean>> ? boolean : T extends GraphQLScalarType<boolean, boolean> ? boolean | null : never;
type GraphQLObject<T> = T extends GraphQLObjectType ? (T extends GraphQLNonNull<GraphQLObjectType> ? T : T | null) : never;

export type DTO<Field extends Fields> = {
    [key in keyof Field]:
        | GraphQLString<Field[key]['type']>
        | GraphQLNumber<Field[key]['type']>
        | GraphQLBoolean<Field[key]['type']>
        | GraphQLObject<Field[key]['type']>;
};

export type GraphQLMaybeScalar = GraphQLNonNull<any> | GraphQLObject<any> | GraphQLInputType;

export interface Fields {
    [key: string]: {
        type: GraphQLMaybeScalar;
    };
}

export interface ResolverConfig {
    name: string;
    description: string;
    route: GraphQLRoute;
    fields: {
        input: ThunkObjMap<GraphQLInputFieldConfig>;
        output: ThunkObjMap<GraphQLFieldConfig<any, any, any>>;
    };
}

export abstract class Resolver<Input extends Fields, Output extends Fields> {
    private readonly output: GraphQLOutputType;
    private readonly input: GraphQLMaybeScalar | null;

    private readonly typeName: string;
    private readonly outputName: string;

    private readonly description: string;

    private readonly route: GraphQLRoute;

    getRoute() {
        return this.route;
    }

    getType(middlewares: MiddlewareFn<Input>[]) {
        return {
            [this.typeName]: {
                type: this.output,
                description: this.description,
                args: this.input,
                resolve: (root: null, args: DTO<Input>, context: Context, resolveInfo: GraphQLResolveInfo) => {
                    const resolverFn = this.resolverFn;

                    if (middlewares && middlewares.length === 0) return resolverFn(root, args, context, resolveInfo);

                    function next(index: number, root: null, args: DTO<Input>, context: Context, resolveInfo: GraphQLResolveInfo): Promise<DTO<Output>> | void {
                        if (index === middlewares.length) return resolverFn(root, args, context, resolveInfo);
                        return middlewares[index](root, args, context, resolveInfo, (sRoot, sArgs, sContext, sResolveInfo) => {
                            return next(index + 1, sRoot ?? root, sArgs ?? args, sContext ?? context, sResolveInfo ?? resolveInfo);
                        });
                    }

                    return next(0, root, args, context, resolveInfo);
                },
            },
        };
    }

    protected constructor(config: ResolverConfig) {
        this.route = config.route;
        this.typeName = `${config.name}`;
        this.outputName = `${config.name}Output`;

        const hasInputFields = Object.keys(config.fields.input).length > 0;
        this.input = hasInputFields ? config.fields.input : null;

        this.output = new GraphQLObjectType({
            name: this.outputName,
            fields: config.fields.output,
        });

        this.description = config.description;
    }

    protected abstract resolverFn(root: null, input: DTO<Input>, context: Context, resolveInfo?: GraphQLResolveInfo): Promise<DTO<Output>>;
}
