import {GraphQLResolveInfo} from 'graphql';
import {Context} from '../../modules/shared/domain/context';
import {DTO, Fields} from '../resolver';

export type MiddlewareFn<Input extends Fields> = (
    root: null,
    args: DTO<Input>,
    context: Context,
    resolveInfo: GraphQLResolveInfo,
    next: (...args: any[]) => void,
) => void;
