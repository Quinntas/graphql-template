import {Router} from '../../core/types/router';
import {userRouter} from '../../modules/user/infra/router/userRouter';
import {forEach} from '../../utils/iterators';

export namespace MainRouter {
    const routes: Router = [...userRouter];

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
