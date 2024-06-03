import {Resolver} from '../resolver';

export type Router = {
    resolver: Resolver<any, any>;
    middleware: any[];
}[];
