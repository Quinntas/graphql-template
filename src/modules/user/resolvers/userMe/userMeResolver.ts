import {DTO, Resolver} from '../../../../core/resolver';
import {Context} from '../../../shared/domain/context';
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

    async resolverFn(_: null, __: DTO<typeof userMeInputFields>, context: Context) {
        return {
            data: context.user,
        };
    }
}
