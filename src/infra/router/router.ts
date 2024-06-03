import {ArrayOfResolvers} from '../../core/resolver';
import {userRouter} from '../../modules/user/infra/router/userRouter';
import {forEach} from '../../utils/iterators';

export namespace MainRouter {
    const routes: ArrayOfResolvers = [...userRouter.resolvers];

    let queries = {};
    let mutations = {};

    forEach(routes, (value) => {
        switch (value.getRoute()) {
            case 'mutation':
                Object.assign(mutations, {
                    ...value.getType(),
                });
                break;
            case 'query':
                Object.assign(queries, {
                    ...value.getType(),
                });
                break;
        }
    });

    export function getQueries() {
        return queries;
    }

    export function getMutations() {
        return mutations;
    }
}
