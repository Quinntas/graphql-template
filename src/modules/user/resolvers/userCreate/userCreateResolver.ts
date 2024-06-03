import {DTO, Resolver} from '../../../../core/resolver';
import {Context} from '../../../shared/domain/context';
import {userCreateInputFields, userCreateOutputFields} from './userCreateFields';

export class UserCreateResolver extends Resolver<typeof userCreateInputFields, typeof userCreateOutputFields> {
    constructor() {
        super({
            name: 'userCreate',
            description: 'Create a new user',
            route: 'mutation',
            fields: {
                input: userCreateInputFields,
                output: userCreateOutputFields,
            },
        });
    }

    async resolverFn(_: null, input: DTO<typeof userCreateInputFields>, context: Context) {
        console.log(input);
        console.log(context);

        return {
            isSuccessful: true,
        };
    }
}
