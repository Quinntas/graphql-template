import {
    GraphQLFieldConfig,
    GraphQLInputFieldConfig,
    GraphQLInputObjectType,
    GraphQLInputType,
    GraphQLObjectType,
    GraphQLOutputType,
    GraphQLResolveInfo,
    ThunkObjMap,
} from 'graphql';
import {Context} from '../modules/shared/domain/context';

export abstract class Resolver<Input, Output> {
    private type: ThunkObjMap<GraphQLFieldConfig<any, any>>;
    private output: GraphQLOutputType;
    private input: GraphQLInputType;

    private typeName: string;
    private inputName: string;
    private outputName: string;

    getType() {
        return this.type;
    }

    protected constructor(
        name: string,
        inputFields: ThunkObjMap<GraphQLInputFieldConfig>,
        outputFields: ThunkObjMap<GraphQLFieldConfig<any, any, any>>,
    ) {
        this.typeName = `${name}`;
        this.inputName = `${name}Input`;
        this.outputName = `${name}Output`;

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
                args: {
                    [this.inputName]: {
                        type: this.input,
                    },
                },
                resolve: async (
                    root: null,
                    args: {
                        [key: string]: Input;
                    },
                    context: Context,
                    resolveInfo: GraphQLResolveInfo,
                ) => {
                    return this.resolverFn(root, args[this.inputName], context, resolveInfo);
                },
            },
        };
    }

    protected abstract resolverFn(
        root: null,
        input: Input,
        context: Context,
        resolveInfo?: GraphQLResolveInfo,
    ): Promise<Output>;
}
