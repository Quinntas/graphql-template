import {Router} from '../../core/types/router';
import {userRouter} from '../../modules/user/infra/router/userRouter';
import {forEach} from '../../utils/iterators';

export namespace MainRouter {
    const routes: Router = [...userRouter];

    let queries = {};
    let mutations = {};

    forEach(routes, (value) => {
        switch (value.resolver.getRoute()) {
            case 'mutation':
                Object.assign(mutations, {
                    ...value.resolver.getType(value.middleware),
                });
                break;
            case 'query':
                Object.assign(queries, {
                    ...value.resolver.getType(value.middleware),
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
