import {DTO, Resolver} from '../../../../core/resolver';
import {userUpdateInputFields, userUpdateOutputFields} from './userUpdateFields';

export class UserUpdateResolver extends Resolver<typeof userUpdateInputFields, typeof userUpdateOutputFields> {
    constructor() {
        super({
            name: 'userUpdate',
            description: 'Updates a user',
            route: 'mutation',
            fields: {
                input: userUpdateInputFields,
                output: userUpdateOutputFields,
            },
        });
    }

    async resolverFn(_: null, input: DTO<typeof userUpdateInputFields>) {
        console.log(input);

        return {
            isSuccessful: true,
        };
    }
}
