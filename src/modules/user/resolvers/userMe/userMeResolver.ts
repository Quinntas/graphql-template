import {DTO, Resolver} from '../../../../core/resolver';
import {Context} from '../../../shared/domain/context';
import {userMeInputFields, userMeOutputFields} from './userMeFields';

export class UserMeResolver extends Resolver<typeof userMeInputFields, typeof userMeOutputFields> {
    constructor() {
        super({
            name: 'userMe',
            description: 'Get the current user',
            route: 'query',
            inputFields: userMeInputFields,
            outputFields: userMeOutputFields,
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
