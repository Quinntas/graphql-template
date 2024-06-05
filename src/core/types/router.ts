import {Resolver} from '../resolver';
import {MiddlewareFn} from './middleware';

export type Router = {
    resolver: Resolver<any, any>;
    middleware: MiddlewareFn<any>[];
}[];
