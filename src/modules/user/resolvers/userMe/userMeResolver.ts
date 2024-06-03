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

    async resolverFn(_: null, input: DTO<typeof userMeInputFields>, context: Context) {
        console.log(input);
        console.log(context);

        return {
            data: null,
        };
    }
}
