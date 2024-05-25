import {loginResolver} from '../../../user/resolvers/userLogin';

export function router() {
    return {
        ...loginResolver.getType(),
    };
}
