import {loginResolver} from '../../../user/resolvers/login';

export function router() {
    return {
        ...loginResolver.getType(),
    };
}
