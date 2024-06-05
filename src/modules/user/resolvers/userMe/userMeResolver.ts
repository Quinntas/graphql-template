import {DTO, Resolver} from '../../../../core/resolver';
import {UserContext} from '../../infra/context/userContext';
import {userMeInputFields, userMeOutputFields} from './userMeFields';

export class UserMeResolver extends Resolver<typeof userMeInputFields, typeof userMeOutputFields> {
    constructor() {
        super({
            name: 'userMe',
            description: 'Get the current logged in user',
            route: 'query',
            fields: {
                input: userMeInputFields,
                output: userMeOutputFields,
            },
        });
    }

    async resolverFn(_: null, __: DTO<typeof userMeInputFields>, context: UserContext) {
        return {
            data: context.user,
        };
    }
}
