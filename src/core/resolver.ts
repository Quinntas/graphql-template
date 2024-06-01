import {
    GraphQLFieldConfig,
    GraphQLInputFieldConfig,
    GraphQLInputObjectType,
    GraphQLInputType,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLOutputType,
    GraphQLResolveInfo,
    ThunkObjMap,
} from 'graphql';
import {GraphQLScalarType} from 'graphql/type';
import {Context} from '../modules/shared/domain/context';

type GraphQLRoute = 'query' | 'mutation';

type GraphQLString<T> =
    T extends GraphQLNonNull<GraphQLScalarType<string, string>> ? string : T extends GraphQLScalarType<string, string> ? string | null : never;
type GraphQLNumber<T> =
    T extends GraphQLNonNull<GraphQLScalarType<number, number>> ? number : T extends GraphQLScalarType<number, number> ? number | null : never;
type GraphQLBoolean<T> =
    T extends GraphQLNonNull<GraphQLScalarType<boolean, boolean>> ? boolean : T extends GraphQLScalarType<boolean, boolean> ? boolean | null : never;

type GraphQLObject<T> = T extends GraphQLObjectType ? T | null : never;

export type DTO<Field extends Fields> = {
    [key in keyof Field]:
        | GraphQLString<Field[key]['type']>
        | GraphQLNumber<Field[key]['type']>
        | GraphQLBoolean<Field[key]['type']>
        | GraphQLObject<Field[key]['type']>;
};

export type GraphQLMaybeScalar = GraphQLNonNull<GraphQLScalarType<any, any>> | GraphQLScalarType<any, any> | GraphQLObject<any>;

interface Fields {
    [key: string]: {
        type: GraphQLMaybeScalar;
    };
}

export abstract class Resolver<Input extends Fields, Output extends Fields> {
    private readonly type: ThunkObjMap<GraphQLFieldConfig<any, any>>;
    private readonly output: GraphQLOutputType;
    private readonly input: GraphQLInputType;

    private readonly typeName: string;
    private readonly inputName: string;
    private readonly outputName: string;

    private readonly route: GraphQLRoute;

    getRoute() {
        return this.route;
    }

    getType() {
        return this.type;
    }

    protected constructor(
        name: string,
        route: GraphQLRoute,
        inputFields: ThunkObjMap<GraphQLInputFieldConfig>,
        outputFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>>,
    ) {
        this.route = route;

        this.typeName = `${name}`;
        this.inputName = `${name}Input`;
        this.outputName = `${name}Output`;

        const hasInputFields = Object.keys(inputFields).length > 0;

        this.input = new GraphQLInputObjectType({
            name: this.inputName,
            fields: inputFields,
        });

        this.output = new GraphQLObjectType({
            name: this.outputName,
            fields: outputFields,
        });

        this.type = {
            [this.typeName]: {
                type: this.output,
                args: hasInputFields
                    ? {
                          [this.inputName]: {
                              type: this.input,
                          },
                      }
                    : {},
                resolve: async (
                    root: null,
                    args: {
                        [key: string]: DTO<Input>;
                    },
                    context: Context,
                    resolveInfo: GraphQLResolveInfo,
                ) => {
                    return this.resolverFn(root, args[this.inputName], context, resolveInfo);
                },
            },
        };
    }

    protected abstract resolverFn(root: null, input: DTO<Input>, context: Context, resolveInfo?: GraphQLResolveInfo): Promise<DTO<Output>>;
}
