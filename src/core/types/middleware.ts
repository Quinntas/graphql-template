import {GraphQLResolveInfo} from 'graphql';
import {Context} from '../../modules/shared/domain/context';

export type MiddlewareFn<T extends object = any> = (
    root: null,
    args: T,
    context: Context,
    resolveInfo: GraphQLResolveInfo,
    next: (...args: any[]) => void,
) => void;
